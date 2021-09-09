import React, { useState, useEffect } from 'react';
import "./indexPage.scss";
import axios from "axios";
import { Placement, Colors, StorageToken } from "../../types/globalTypes";
import TinderCard from "../../components/TinderCard/TinderCard";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimesCircle, faRedo, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { getToken, getPets } from "../../redux/actions/petsActions";
import { SET_TOKEN, SET_PAGINATION } from "../../redux/types/petsTypes";
import { formatToken } from "../../utilities/helpers";
import { RootState } from "../../redux/store";

const isTokenExpired = (token: StorageToken): boolean => {;
  if (Date.now() > token.expiration_time) return true;
  else return false;
}

const IndexPage: React.FC = () => {
  const [currentPetIndex, setCurrentPetIndex] = useState<number>(0);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const cardRef = React.createRef<HTMLDivElement>();
  const { pets, pagination, token, isError, loading } = useSelector((state: RootState) => state.petsReducer);
  const dispatch = useDispatch();
  const LOCAL_STORAGE_TOKEN_KEY = "PET_TINDER_TOKEN";

  // TODO: unscubscribe to axios requst in () => useEffect function

  useEffect(() => { 
    // Check if token is in localstorage
    const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (savedToken) {
      // Check if token expired, if so get new one
      const parsedToken = JSON.parse(savedToken);
      if (isTokenExpired(parsedToken)) {
        dispatch(getToken());
      } else {
        dispatch({ type: SET_TOKEN, payload: parsedToken });
      }
    } else {
      dispatch(getToken());
    }
  }, []);

  useEffect(() => {
    if (token === null) return;
    const storageToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!storageToken) {
      // Set new token in localstorage if there is no one
      const newToken: StorageToken = formatToken(token);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(newToken));
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
    // Get pets when token changes
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

  const isNextPage = (): boolean => {
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
      type: SET_PAGINATION,
      payload: { ...pagination, current_page: nextPage }
    });
  }
  

  const handleLikeClick = () => {
    if (pagination === null) return;
    setButtonsDisabled(true);
    makeCardAnimation(() => {
      // TODO: save in DB
      // Check for next page
      if (isNextPage()) {
        setNextPage();
      } else {
        setCurrentPetIndex((prevIndex) => prevIndex + 1);
      }
      setButtonsDisabled(false);
    });
  }

  const handleDislikeClick = () => {
    if (pagination === null) return;
    setButtonsDisabled(true);
      makeCardAnimation(() => {
        // TODO: save in DB
        // Check for next page
        if (isNextPage()) {
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
    dispatch(await getPets());
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
              style={{ fontSize: "2.2rem", padding: "1rem" }} 
              onClick={handleRefresh}
            >
              <FontAwesomeIcon icon={faRedo} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Dislike" placement={Placement.top}>
            <RoundedButton 
              color={Colors.red} 
              style={{ fontSize: "2.2rem", padding: "1rem" }} 
              onClick={buttonsDisabled ? undefined : handleDislikeClick}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Like" placement={Placement.top}>
            <RoundedButton 
              color={Colors.green}  
              style={{ fontSize: "2.2rem", padding: "1rem" }} 
              onClick={buttonsDisabled ? undefined : handleLikeClick}
            >
              <FontAwesomeIcon icon={faHeart} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Filter" placement={Placement.top}>
            <RoundedButton 
              color={Colors.purple} 
              style={{ fontSize: "2.2rem", 
              padding: "1rem" }}
            >
              <FontAwesomeIcon icon={faSortAmountUp} />
            </RoundedButton>
          </Tooltip>
        </div>
    </>
  )
}

export default IndexPage;
