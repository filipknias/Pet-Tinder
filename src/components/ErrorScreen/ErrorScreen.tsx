import React from 'react';
import "./errorScreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ErrorScreen: React.FC = () => {
  return (
    <div className="errorScreen">
      <FontAwesomeIcon icon={faTimes} className="errorScreen__icon" />
      <h1 className="errorScreen__text">Ups! Something gone wrong</h1>
    </div>
  )
}

export default ErrorScreen;
