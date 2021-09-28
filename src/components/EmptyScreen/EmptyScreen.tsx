import React from 'react';
import "./emptyScreen.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

interface Props {
  text: string;
}

const EmptyScreen: React.FC<Props> = ({ text }) => {
  return (
    <div className="emptyScreen">
      <FontAwesomeIcon icon={faFolderOpen} className="emptyScreen__icon" />
      <h1 className="emptyScreen__text">{text}</h1>
    </div>
  )
}

export default EmptyScreen;
