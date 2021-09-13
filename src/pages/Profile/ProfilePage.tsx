import React from 'react';
import "./profilePage.scss";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEnvelope, faUserCog, faUnlockAlt, faChevronRight, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import { Colors } from "../../types/globalTypes";
import { RootState } from "../../redux/store";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Tooltip text="Logout">
      <RoundedButton 
        color={Colors.blue} 
        style={{ fontSize: "1.6rem", padding: "1rem" }}
        onClick={() => dispatch(logoutUser())}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </RoundedButton>
    </Tooltip>
  );
};

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const listItemButtonStyle = {
    fontSize: "1.5rem", 
    padding: "0.9rem 1.2rem",
  };

  return (
    <AuthForm header="Profile" button={LogoutButton}>
      <div className="profileContainer">
        <ul className="profileContainer__list">
          <li className="profileContainer__list__item">
            <div className="profileContainer__list__item__container">
              <FontAwesomeIcon 
                icon={faEnvelope} 
                className="profileContainer__list__item__container__icon" 
              />
              <h3 className="profileContainer__list__item__container__title">Profile verifiaction</h3>
            </div>
            <Tooltip text="E-mail verification">
              <RoundedButton color={Colors.blue} style={listItemButtonStyle}>
                <FontAwesomeIcon icon={faChevronRight} />
              </RoundedButton>
            </Tooltip>
          </li>
          <li className="profileContainer__list__item">
            <div className="profileContainer__list__item__container">
              <FontAwesomeIcon 
                icon={faUnlockAlt} 
                className="profileContainer__list__item__container__icon" 
              />
              <h3 className="profileContainer__list__item__container__title">Reset password</h3>
            </div>
            <Tooltip text="Reset password">
              <RoundedButton color={Colors.blue} style={listItemButtonStyle}>
                <FontAwesomeIcon icon={faChevronRight} />
              </RoundedButton>
            </Tooltip>
          </li>
          <li className="profileContainer__list__item">
            <div className="profileContainer__list__item__container">
              <FontAwesomeIcon 
                icon={faUserCog} 
                className="profileContainer__list__item__container__icon" 
              />
              <h3 className="profileContainer__list__item__container__title">User credentails</h3>
            </div>
            <Tooltip text="Edit profile">
              <RoundedButton color={Colors.blue} style={listItemButtonStyle}>
                <FontAwesomeIcon icon={faChevronRight} />
              </RoundedButton>
            </Tooltip>
          </li>
        </ul>
        <div className="profileContainer__buttonsContainer">
          <button className="profileContainer__buttonsContainer__button button--delete">
            <FontAwesomeIcon className="profileContainer__buttonsContainer__button__icon" icon={faUserSlash} />
            Delete profile
          </button>
          <button className="profileContainer__buttonsContainer__button button--logout">
            <FontAwesomeIcon className="profileContainer__buttonsContainer__button__icon" icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      </div>
    </AuthForm>
  )
}

export default ProfilePage;
