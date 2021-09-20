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
import { NEXT_PAGE } from "../../redux/types/petsTypes";
import { RootState } from "../../redux/store";
import { isTokenExpired } from '../../utilities/helpers';
import { Notification } from "../../types/global";
import { v4 as uuid } from "uuid";

const IndexPage: React.FC = () => {
  const [currentPetIndex, setCurrentPetIndex] = useState<number>(0);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const cardRef = React.createRef<HTMLDivElement>();
  const { pets, pagination, token, isError, loading } = useSelector((state: RootState) => state.petsReducer);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const roundedButtonStyle = {
    fontSize: "2.2rem", 
    padding: "1rem",
  };

  useEffect(() => {
    if (token === null) return;
    // Get pets when token is set
    dispatch(getPets());
  }, [token]);


  useEffect(() => {
    if (pagination === null) return;
    dispatch(getPets(pagination.current_page));
    setCurrentPetIndex(0);
  }, [pagination?.current_page]);

  useEffect(() => {
    if (loading === true || isError === true) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [loading, isError]);

  const makeCardAnimation = (cbAfterAnimation: () => void): void => {
    const { current } = cardRef;
    if (current === null) return;
    current.style.animation = "bounce 0.4s ease-in-out";
    current.onanimationend = () => {
      current.style.animation = "none";
      cbAfterAnimation();
    }
  };

  const hasNextPage = (): boolean => {
    if (currentPetIndex + 1 === pagination?.count_per_page) return true;
    else return false;
  }

  const handleAsyncButtonClick = (asyncCallback: () => void) => {
    
  }

  const setNextPage = (): void => {
    if (pagination === null) return;
    // Set next page
    let nextPage: number = pagination.current_page + 1;
    // Check if all pages has been displayed
    if (nextPage > pagination.total_pages) {
      nextPage = 1;
    }
    // Set next page in pagination state
    dispatch({
      type: NEXT_PAGE,
      payload: nextPage
    });
  }
  

  const handleLikeClick = () => {
    if (pagination === null || token === null) return;
    setButtonsDisabled(true);
    // Check if token is expired
    if (isTokenExpired(token)) {
      dispatch(getToken());
    }

    // if (user && !user.verified) {
    //   const verifyNotification: Notification = {
    //     id: uuid(),
    //     message: "You need to verify e-mail before you continue",
    //     type: "fail",
    //     duration: 1500,
    //   };
    //   dispatch(pushNotification(verifyNotification));
    //   setButtonsDisabled(false);
    //   return;
    // } 
    
    makeCardAnimation(() => {
      // TODO: save in DB
      // Check for next page
      if (hasNextPage()) {
        setNextPage();
      } else {
        setCurrentPetIndex((prevIndex) => prevIndex + 1);
      }
      setButtonsDisabled(false);
    });
    
  }

  const handleDislikeClick = () => {
    if (pagination === null || token === null) return;
    setButtonsDisabled(true);
    if (isTokenExpired(token)) {
      dispatch(getToken());
    }
    makeCardAnimation(() => {
        // TODO: save in DB
        // Check for next page
        if (hasNextPage()) {
          setNextPage();
        } else {
          setCurrentPetIndex((prevIndex) => prevIndex + 1);
        }
        setButtonsDisabled(false);
    });
  }

  const handleRefresh = async () => {
    if (loading) return;
    setButtonsDisabled(true);
    if (token !== null && isTokenExpired(token)) {
      dispatch(getToken());
    }
    dispatch(getPets());
    setCurrentPetIndex(0);
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
                  <TinderCard ref={cardRef} animal={pets[currentPetIndex]} />
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
            >
              <FontAwesomeIcon icon={faSortAmountUp} />
            </RoundedButton>
          </Tooltip>
        </div>
    </>
  )
}

export default IndexPage;
