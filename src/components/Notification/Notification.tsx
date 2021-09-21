import React from 'react';
import "./notification.scss";
import { Notification as NotificationInterface } from "../../types/global";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from "../Tooltip/Tooltip";
import { deleteNotification } from "../../redux/actions/uiActions";
import { useDispatch } from "react-redux";

interface Props {
  notification: NotificationInterface;
};

const Notification: React.FC<Props> = ({ notification: { id, message, type } }) => {
  const dispatch = useDispatch();

  return (
    <div className={`notification notification--${type}`}>
      <div className="notification__container">
        <FontAwesomeIcon 
          icon={type === "success" ? faCheckCircle : type === "fail" ? faTimes : faInfoCircle} 
          className="notification__container__icon"
        />
        <h2 className="notification__container__message">{message}</h2>
      </div>
      <Tooltip text="Delete">
        <FontAwesomeIcon 
          icon={faTimes} 
          className="notification__closeIcon" 
          onClick={() => dispatch(deleteNotification(id))}
        />
      </Tooltip>
    </div>
  )
}

export default Notification;
