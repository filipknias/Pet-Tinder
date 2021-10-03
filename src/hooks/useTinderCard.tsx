import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NEXT_PAGE } from "../redux/types/petsTypes";
import { RootState } from "../redux/store";
import { getToken } from "../redux/actions/petsActions";
import { isTokenExpired } from "../utilities/helpers";
import * as petsTypes from "../redux/types/petsTypes";

const useTinderCard = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { pets, pagination, token } = useSelector((state: RootState) => state.petsReducer);
  const dispatch = useDispatch();
  const cardRef = React.createRef<HTMLDivElement>();

  const isNextPage = (): boolean => {
    if (pagination === null) return false;
    if (currentIndex + 1 === pagination.count_per_page) return true;
    else return false;
  }

  const setNextPage = (): void => {
    if (token === null || pagination === null) return;
    if (pagination.total_pages <= 1) return;
    // Check if token is expired
    if (isTokenExpired(token)) dispatch(getToken());
    // Set next page in pagination state
    dispatch({ type: NEXT_PAGE });
    setCurrentIndex(0);
  };
  
  const handleNextCard = (callback?: () => void) => {
    // TODO: push notifiacation if no more items to show
    // TODO: set notifications delay
    if (isNextPage()) setNextPage();
    else if (currentIndex < pets.length - 1) {
      handleCardSwitch(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (callback) callback();
      });
    }
  };  

  const handlePreviousCard = (callback?: () => void) => {
    // TODO: push notifiacation if no more items to show
    if (currentIndex === 0) return; 
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