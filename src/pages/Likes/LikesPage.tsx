import React, { useState, useEffect } from 'react';
import "./likesPage.scss";
import { Placement, Colors } from "../../types/global";
import TinderCard from "../../components/TinderCard/TinderCard";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen";
import EmptyScreen from "../../components/EmptyScreen/EmptyScreen";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowLeft, faArrowRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { getLikedPets, getToken, deletePet } from '../../redux/actions/petsActions';
import useTinderCard from '../../hooks/useTinderCard';
import axios from "axios";
import { isTokenExpired } from "../../utilities/helpers";

const LikesPage: React.FC = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const { pets, token, likes: { loading, isError } } = useSelector((state: RootState) => state.petsReducer);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const { 
    cardRef, 
    currentIndex, 
    setCurrentIndex, 
    handlePreviousCard, 
    handleNextCard,
    makeCardAnimation,
  } = useTinderCard();
  const roundedButtonStyle = {
    fontSize: "2.1rem", 
    padding: "1rem 1.1rem",
  };

  useEffect(() => {
    if (user === null) return;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    dispatch(getLikedPets(user.uid, source.token));
    return () => {
      source.cancel();
    }
  }, [token]);

  useEffect(() => {
    if (loading || isError) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [loading, isError]);

  const handleRefresh = () => {
    if (loading || user === null) return;
    setButtonsDisabled(true);
    // Get token
    if (token && isTokenExpired(token)) {
      dispatch(getToken());
    }
    // Get pets
    dispatch(getLikedPets(user.uid));
    // Reset state
    setCurrentIndex(0);
    setButtonsDisabled(false);
  };

  const handleDelete = () => {
    makeCardAnimation(() => {
      dispatch(deletePet(pets[currentIndex].id));
      if (currentIndex === pets.length - 1 && currentIndex > 0) setCurrentIndex((prevIndex) => prevIndex - 1);
    });
  };

  return (
    <>
      {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {isError ? (
              <ErrorScreen />
            ) : (
              <>  
                {pets.length > 0 ? (
                  <TinderCard ref={cardRef} animal={pets[currentIndex]} />
                ) : (
                  <>
                  <EmptyScreen text="You haven't liked any animals yet" />
                  </>
                )}
              </>
            )}
          </>
        )}
        <div className="tinderButtons">
          <Tooltip text="Reload" placement={Placement.top}>
            <RoundedButton 
              color={Colors.yellow} 
              style={roundedButtonStyle} 
              onClick={handleRefresh}
            >
              <FontAwesomeIcon icon={faRedo} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Previous" placement={Placement.top}>
            <RoundedButton 
              color={Colors.blue} 
              style={roundedButtonStyle} 
              onClick={buttonsDisabled ? undefined : () => handlePreviousCard()}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Next" placement={Placement.top}>
            <RoundedButton 
              color={Colors.blue}  
              style={roundedButtonStyle} 
              onClick={buttonsDisabled ? undefined : () => handleNextCard()}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Delete" placement={Placement.top}>
            <RoundedButton 
              color={Colors.red} 
              style={roundedButtonStyle}
              onClick={buttonsDisabled ? undefined : handleDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </RoundedButton>
          </Tooltip>
        </div>
    </>
  )
}

export default LikesPage;
