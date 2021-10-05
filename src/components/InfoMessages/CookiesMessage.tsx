import React from 'react';
import "./infoMessage.scss";
import { useDispatch } from "react-redux";
import * as uiTypes from "../../redux/types/uiTypes";
import { LOCAL_STORAGE_COOKIES_KEY } from "../../types/constants";

const CookiesMessage: React.FC = () => {
  const dispatch = useDispatch();

  const acceptCookies = () => {
    dispatch({ type: uiTypes.MARK_COOKIES_ACCEPTED });
    localStorage.setItem(LOCAL_STORAGE_COOKIES_KEY, JSON.stringify(true));
  };

  return (
    <div className="infoMessage">
      <h4 className="infoMessage__message">
        This website uses cookies to save your preferences and provide you with a better Pet Tinder experience.
      </h4>
      <div className="infoMessage__buttonsContainer">
        <button 
          type="button" 
          className="infoMessage__buttonsContainer__btn"
          onClick={acceptCookies}
        >
          Accept cookies
        </button>
      </div>
    </div>
  )
}

export default CookiesMessage;
