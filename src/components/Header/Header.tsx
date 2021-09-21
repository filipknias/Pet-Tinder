import React, { useState } from 'react';
import "./header.scss";
import RoundedButton from "../RoundedButton/RoundedButton";
import Tooltip from "../Tooltip/Tooltip";
import { Colors } from "../../types/global";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faHeart, faUserTimes, faUserCheck, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import NotificationsModal from '../NotificationsModal/NotificationsModal';

const Header: React.FC = () => {
  const [notificationsModalOpen, setNotificationsModalOpen] = useState<boolean>(false);
  const { isAuth } = useSelector((state: RootState) => state.authReducer);
  const { notifications } = useSelector((state: RootState) => state.uiReducer);

  return (
    <div className="header">
        <div className="header__group">
          <div className="header__group__container">
            <FontAwesomeIcon icon={faPaw} className="header__group__container__icon" />
            <h1 className="header__group__container__title">Pet Tinder</h1>
          </div>
          <h5 className="header__group__container__poweredby">
            Powered By {" "}
            <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer">PetFinder.com</a>
          </h5>
        </div>
        <div className="header__buttons">
          <Link to={routes.index}>
            <Tooltip text="Pets">
              <RoundedButton color={Colors.purple} style={{ fontSize: "1rem" }}> 
                <FontAwesomeIcon icon={faPaw} />
              </RoundedButton>
            </Tooltip>
          </Link>
          <Tooltip text="Likes">
            <RoundedButton color={Colors.red} style={{ fontSize: "1rem" }}> 
              <FontAwesomeIcon icon={faHeart} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Notifications">
            <RoundedButton 
              color={Colors.blue} 
              style={{ fontSize: "1rem", paddingLeft: "0.9rem", paddingRight: "0.9rem" }}
              badge={notifications.length > 0 ? notifications.length.toString() : undefined}
              onClick={() => setNotificationsModalOpen(!notificationsModalOpen)}
            > 
              <FontAwesomeIcon icon={faBell} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text={isAuth ? "Profile" : "Sign In"}>
            <Link to={isAuth ? routes.profile : routes.signIn}>
              <RoundedButton 
                color={isAuth ? Colors.green : Colors.red} 
                style={{ fontSize: "1rem", padding: "0.8rem 0.7rem" }}
              > 
                <FontAwesomeIcon icon={isAuth ? faUserCheck : faUserTimes} />
              </RoundedButton>
            </Link>
          </Tooltip>
          <NotificationsModal open={notificationsModalOpen} setOpen={setNotificationsModalOpen} />
        </div>
    </div>
  )
}

export default Header;
