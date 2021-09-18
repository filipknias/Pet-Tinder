import React, { useState, useEffect } from 'react';
import "./profilePage.scss";
import { logoutUser, sendVerificationEmail, sendResetPasswordEmail } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEnvelope, faUserCog, faUnlockAlt, faChevronRight, faUserSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import { Colors } from "../../types/global";
import { RootState } from "../../redux/store";
import AuthFeedback from "../../components/AuthFormFeedback/AuthFeedback";
import * as authTypes from "../../redux/types/authTypes";
import { auth } from "../../utilities/firebase";
import { Link } from "react-router-dom";
import routes from '../../utilities/routes';

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
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user, verifyUser, resetPassword } = useSelector((state: RootState) => state.authReducer);
  const listItemButtonStyle = {
    fontSize: "1.5rem", 
    padding: "0.9rem 1.2rem",
  };
  const listItemLoadingStyle = {
    padding: "1rem",
    fontSize: "1.5rem",
    cursor: "default",
  };

  useEffect(() => {
    dispatch({ type: authTypes.CLEAR_OUT });
  }, []);

  useEffect(() => {
    if (verifyUser.loading) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [verifyUser.loading]);

  const handleResetPassword = () => {
    if (buttonsDisabled) return undefined;
    else {
      if (user === null) return;
      dispatch(sendResetPasswordEmail(user.email));
    }
  };

  return (
    <AuthForm header="Profile" button={LogoutButton}>
      <div className="profileContainer">
        <div className="profileContainer__errors">
          {verifyUser.feedback && (
            <AuthFeedback type={verifyUser.feedback.type} message={verifyUser.feedback.message} />
          )}
          {resetPassword.feedback && (
            <AuthFeedback type={resetPassword.feedback.type} message={resetPassword.feedback.message} />
          )}
        </div>
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
              <RoundedButton 
                color={Colors.blue} 
                style={verifyUser.loading ? listItemLoadingStyle : listItemButtonStyle} 
                onClick={buttonsDisabled ? undefined : () => dispatch(sendVerificationEmail())}
              >
                <>
                  {verifyUser.loading ? (
                    <FontAwesomeIcon className="profileContainer__list__item__loadingIcon" icon={faSpinner} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} />
                  )}
                </>
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
              <RoundedButton 
                color={Colors.blue}
                style={resetPassword.loading ? listItemLoadingStyle : listItemButtonStyle} 
                onClick={handleResetPassword}
              >
                <>
                  {resetPassword.loading ? (
                    <FontAwesomeIcon className="profileContainer__list__item__loadingIcon" icon={faSpinner} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronRight} />
                  )}
                </>
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
              <Link to={routes.editProfile}>
                <RoundedButton color={Colors.blue} style={listItemButtonStyle}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </RoundedButton>
              </Link>
            </Tooltip>
          </li>
        </ul>
        <div className="profileContainer__buttonsContainer">
          <button className="profileContainer__buttonsContainer__button button--delete">
            <FontAwesomeIcon className="profileContainer__buttonsContainer__button__icon" icon={faUserSlash} />
            Delete profile
          </button>
          <button className="profileContainer__buttonsContainer__button button--logout" onClick={() => dispatch(logoutUser())}>
            <FontAwesomeIcon className="profileContainer__buttonsContainer__button__icon" icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      </div>
    </AuthForm>
  )
}

export default ProfilePage;
