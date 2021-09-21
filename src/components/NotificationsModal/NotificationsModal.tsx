import React from 'react';
import "./notificationsModal.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles, faBell } from '@fortawesome/free-solid-svg-icons';
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import Notification from "../Notification/Notification";
import Modal from "../Modal/Modal";
import { deleteNotification } from "../../redux/actions/uiActions";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationsModal: React.FC<Props> = ({ open, setOpen }) => {
  const { notifications } = useSelector((state: RootState) => state.uiReducer);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    notifications.forEach(({ id }) => {
      dispatch(deleteNotification(id));
    });
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}> 
      <div className="notificationsModal">
        <h1 className="notificationsModal__title">Notifications</h1>
        <div 
          className={`notificationsModal__container ${notifications.length === 0 ? "notificationsModal__container--empty" : ""}`}
        >
          <>
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification) => (
                <Notification notification={notification} key={notification.id} />
              ))}
            </>
          ) : (
            <div className="notificationsModal__container__empty">
              <FontAwesomeIcon className="notificationsModal__container__empty__icon" icon={faBell} />
              <h1 className="notificationsModal__container__empty__header">You have no notifications</h1>
            </div>
          )}
          </>
        </div>
        <button className="notificationsModal__closeButton">
          <FontAwesomeIcon 
            icon={faHandSparkles} 
            className="notificationsModal__closeButton__icon" 
            onClick={handleClearAll}
          />
          Clear all
        </button>
      </div>
    </Modal>
  )
}

export default NotificationsModal;
