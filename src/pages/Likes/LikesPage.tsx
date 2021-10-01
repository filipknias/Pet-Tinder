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
import { getLikedPets } from '../../redux/actions/petsActions';
import useTinderCard from '../../hooks/useTinderCard';
import axios from "axios";
import * as petsTypes from "../../redux/types/petsTypes";

const LikesPage: React.FC = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const { pets, pagination, isError, loading } = useSelector((state: RootState) => state.petsReducer);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const { cardRef, currentIndex, setCurrentIndex, handlePreviousCard, handleNextCard } = useTinderCard();
  const roundedButtonStyle = {
    fontSize: "2.2rem", 
    padding: "1rem 1.1rem",
  };

  useEffect(() => {
    if (user === null) return;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    dispatch(getLikedPets(user.uid, 1, source.token));
    return () => {
      source.cancel();
    }
  }, []);

  useEffect(() => {
    if (loading || isError) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [loading, isError]);

  const handleNextClick = () => {
    if (pagination === null) return;
    // Check if it is last index
    const { current_page, total_pages, count_per_page } = pagination;
    // if (current_page === total_pages && currentIndex + 1 > count_per_page) return;
    // Next card
    handleNextCard();
  };  

  const handlePrevClick = () => {
    if (pagination === null) return;
    // Check if it is first item
    if (currentIndex === 0 && pagination.current_page > 1) {
      // Prev page action
      setCurrentIndex(pagination.count_per_page - 1);
      dispatch({ type: petsTypes.PREV_PAGE });
    } else {
      // Previous card
      handlePreviousCard();
    }
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
              onClick={undefined}
            >
              <FontAwesomeIcon icon={faRedo} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Previous" placement={Placement.top}>
            <RoundedButton 
              color={Colors.blue} 
              style={roundedButtonStyle} 
              onClick={buttonsDisabled ? undefined : handlePrevClick}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Next" placement={Placement.top}>
            <RoundedButton 
              color={Colors.blue}  
              style={roundedButtonStyle} 
              onClick={buttonsDisabled ? undefined : handleNextClick}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Delete" placement={Placement.top}>
            <RoundedButton 
              color={Colors.red} 
              style={roundedButtonStyle}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </RoundedButton>
          </Tooltip>
        </div>
    </>
  )
}

export default LikesPage;
