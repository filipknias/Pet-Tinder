import React from 'react';
import "./notification.scss";
import { Notification as NotificationInterface } from "../../types/global";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  notification: NotificationInterface;
};

const Notification: React.FC<Props> = ({ notification: { message, type } }) => {
  return (
    <div className={`notification notification--${type}`}>
      <FontAwesomeIcon 
        icon={type === "success" ? faCheckCircle : type === "fail" ? faTimes : faInfoCircle} 
        className="notification__icon"
      />
      <h2 className="notification__message">{message}</h2>
    </div>
  )
}

export default Notification;
