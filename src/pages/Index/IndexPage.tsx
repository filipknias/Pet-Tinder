import React, { useState, useEffect } from 'react';
import "./indexPage.scss";
import { Placement, Colors } from "../../types/global";
import TinderCard from "../../components/TinderCard/TinderCard";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimesCircle, faRedo, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { getToken, getPets } from "../../redux/actions/petsActions";
import { pushNotification } from "../../redux/actions/uiActions";
import { RootState } from "../../redux/store";
import { isTokenExpired } from '../../utilities/helpers';
import { Notification } from "../../types/global";
import { v4 as uuid } from "uuid";
import Like from "../../models/Like";
import Reject from "../../models/Reject";
import useFirestore from "../../hooks/useFirestore";
import { firestore, timestamp } from "../../utilities/firebase";
import { where } from "firebase/firestore";
import FiltersModal from '../../components/FiltersModal/FiltersModal';
import useTinderCard from '../../hooks/useTinderCard';
import axios from "axios";

const IndexPage: React.FC = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const [likedPetsCounter, setLikedPetsCounter] = useState<number>(0);
  const [rejectedPetsCounter, setRejectedPetsCounter] = useState<number>(0);
  const [filtersModalOpen, setFiltersModalOpen] = useState<boolean>(false);
  const { pets, pagination, token, isError, loading, filters } = useSelector((state: RootState) => state.petsReducer);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const { saveItem, getQueriedItems } = useFirestore(firestore);
  const roundedButtonStyle = {
    fontSize: "2.2rem", 
    padding: "1rem",
  };
  const { cardRef, currentIndex, handleNextCard, setCurrentIndex } = useTinderCard();

  useEffect(() => {
    if (token === null) return;
    // Get pets when token is set
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    dispatch(getPets(1, filters, source.token));
    return () => {
      source.cancel();
    };
  }, [token]);

  useEffect(() => {
    if (pagination === null) return;
    setCurrentIndex(0);
    if (token && isTokenExpired(token)) {
      dispatch(getToken());
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    dispatch(getPets(pagination.current_page, filters, source.token));
    return () => {
      source.cancel();
    };
  }, [filters]);

  useEffect(() => {
    if (pagination === null) return;
    if (token && isTokenExpired(token)) {
      dispatch(getToken());
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    dispatch(getPets(pagination.current_page, filters, source.token));
    // Push info notification
    if (pagination.current_page > 1) {
      const infoNotification: Notification = {
        id: uuid(),
        message: `You have liked ${likedPetsCounter} pets and rejected ${rejectedPetsCounter}`,
        type: "success",
      };
      dispatch(pushNotification(infoNotification));
    } 

    // Reset state
    setLikedPetsCounter(0);
    setRejectedPetsCounter(0);

    return () => {
      source.cancel();
    };
  }, [pagination?.current_page]);

  useEffect(() => {
    if (loading || isError) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [loading, isError]);

  
  const handleLikeClick = () => {
    setButtonsDisabled(true);
    handleNextCard(async () => {
      if (user === null) return;
      const likeObject: Like = {
        user_id: user.uid,
        pet_id: pets[currentIndex].id,
        created_at: timestamp,
      }
      const petsQuery = where("pet_id", "==", pets[currentIndex].id);
      const petsFromDb = await getQueriedItems("likes", petsQuery);
      if (petsFromDb && petsFromDb.length > 0) return;
      await saveItem("likes", likeObject);
      setLikedPetsCounter((prevCounter) => prevCounter + 1);
    });
    setButtonsDisabled(false);
  }

  const handleDislikeClick = () => {
    setButtonsDisabled(true);
    handleNextCard(async () => {
      if (user === null) return;
      const rejectObject: Reject = {
        user_id: user.uid,
        pet_id: pets[currentIndex].id,
        created_at: timestamp,
      }
      const petsQuery = where("pet_id", "==", pets[currentIndex].id);
      const petsFromDb = await getQueriedItems("rejects", petsQuery);
      if (petsFromDb && petsFromDb.length > 0) return;
      await saveItem("rejects", rejectObject);
      setRejectedPetsCounter((prevCounter) => prevCounter + 1);
    });
    setButtonsDisabled(false);
  }

  const handleRefresh = async () => {
    if (loading) return;
    setButtonsDisabled(true);
    // Get token
    if (token && isTokenExpired(token)) {
      dispatch(getToken());
    }
    if (pagination === null) return;
    // Get pets
    dispatch(getPets(pagination.current_page, filters));
    // Reset state
    setCurrentIndex(0);
    setLikedPetsCounter(0);
    setRejectedPetsCounter(0);
    setButtonsDisabled(false);
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
                {pets.length > 0 && (
                  <TinderCard ref={cardRef} animal={pets[currentIndex]} />
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
          <Tooltip text="Dislike" placement={Placement.top}>
            <RoundedButton 
              color={Colors.red} 
              style={roundedButtonStyle} 
              onClick={buttonsDisabled ? undefined : handleDislikeClick}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Like" placement={Placement.top}>
            <RoundedButton 
              color={Colors.green}  
              style={roundedButtonStyle} 
              onClick={buttonsDisabled ? undefined : handleLikeClick}
            >
              <FontAwesomeIcon icon={faHeart} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Filter" placement={Placement.top}>
            <RoundedButton 
              color={Colors.purple} 
              style={roundedButtonStyle}
              onClick={() => setFiltersModalOpen(true)}
            >
              <FontAwesomeIcon icon={faSortAmountUp} />
            </RoundedButton>
          </Tooltip>
        </div>
        <FiltersModal open={filtersModalOpen} setOpen={setFiltersModalOpen} />
    </>
  )
}

export default IndexPage;
