import React from 'react';
import "./infoMessage.scss";
import { useDispatch } from "react-redux";
import * as uiTypes from "../../redux/types/uiTypes";
import { LOCAL_STORAGE_API_INFORMATION_KEY } from "../../types/constants";

const ApiMessage: React.FC = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: uiTypes.MARK_API_INFORMATION_CLOSED });
    localStorage.setItem(LOCAL_STORAGE_API_INFORMATION_KEY, JSON.stringify(true));
  };

  return (
    <div className="infoMessage">
      <h4 className="infoMessage__message">
        This website using <a href="https://www.petfinder.com/" target="_blank">PetFinder.com</a> resources which is a pet adoption service.
      </h4>
      <div className="infoMessage__buttonsContainer">
        <a 
          href="https://www.petfinder.com/" 
          target="_blank"
          className="infoMessage__buttonsContainer__btn"
        >
          Learn more
        </a>
        <button 
          type="button" 
          className="infoMessage__buttonsContainer__btn"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ApiMessage;
