import React from 'react';
import "./loadingScreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingScreen = () => {
  return (
    <div className="loadingScreen">
      <FontAwesomeIcon icon={faSpinner} className="loadingScreen__icon" />
    </div>
  )
}

export default LoadingScreen
