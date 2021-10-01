import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NEXT_PAGE } from "../redux/types/petsTypes";
import { RootState } from "../redux/store";
import { getToken } from "../redux/actions/petsActions";
import { isTokenExpired } from "../utilities/helpers";

const useTinderCard = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { pagination, token } = useSelector((state: RootState) => state.petsReducer);
  const dispatch = useDispatch();
  const cardRef = React.createRef<HTMLDivElement>();

  const isNextPage = (): boolean => {
    if (currentIndex + 1 === pagination?.count_per_page) return true;
    else return false;
  }

  const setNextPage = (): void => {
    if (token === null) return;
    // Check if token is expired
    if (isTokenExpired(token)) dispatch(getToken());
    // Set next page in pagination state
    dispatch({ type: NEXT_PAGE });
  };

  const handleNextCard = (callback?: () => void) => {
    // TODO: push notifiacation if no more items to show
    if (isNextPage()) {
      setCurrentIndex(0);
      setNextPage();
    } else {
      handleCardSwitch(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (callback) callback();
      });
    }
  };  

  const handlePreviousCard = (callback?: () => void) => {
    if (currentIndex === 0) return; // TODO: push notifiacation if no more items to show
    handleCardSwitch(() => {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      if (callback) callback();
    });
  };

  const handleCardSwitch = (animationCallback: () => void) => {
    makeCardAnimation(() => animationCallback());
  };  

  const makeCardAnimation = (cbAfterAnimation: () => void): void => {
    const { current } = cardRef;
    if (current === null) return;
    current.style.animation = "bounce 0.4s ease-in-out";
    current.onanimationend = () => {
      current.style.animation = "none";
      cbAfterAnimation();
    }
  };

  return { 
    currentIndex,
    setCurrentIndex,
    cardRef, 
    handleNextCard, 
    handlePreviousCard, 
  };
};

export default useTinderCard;