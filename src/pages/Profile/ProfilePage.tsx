import React, { useState, useEffect } from 'react';
import "./profilePage.scss";
import { 
  logoutUser, 
  sendVerificationEmail, 
  sendResetPasswordEmail, 
  deleteUser as deleteUserAction 
} from "../../redux/actions/authActions";
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
import { Link } from "react-router-dom";
import routes from '../../utilities/routes';
import { useHistory } from 'react-router-dom';
import ReauthenticateModal from "../Auth/ReauthenticateModal";
import { Credentials } from '../Auth/EditProfile';

const ProfilePage: React.FC = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const initialCredentials = {
    email: null,
    password: null,
  };
  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const dispatch = useDispatch();
  const { user, verifyUser, resetPassword, logout, deleteUser } = useSelector((state: RootState) => state.authReducer);
  const history = useHistory();
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
    if (verifyUser.loading || resetPassword.loading || logout.loading || deleteUser.loading) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [verifyUser.loading, resetPassword.loading, logout.loading, deleteUser.loading]);

  const handleResetPassword = () => {
    if (user === null) return;
    dispatch(sendResetPasswordEmail(user.email));
  };

  const handleDeleteUser = () => {
    if (user === null) return;
    setAuthModalOpen(true);
    dispatch(deleteUserAction(user.uid, history, credentials));
  };

  return (
    <>
      <ReauthenticateModal 
        open={authModalOpen}
        setOpen={setAuthModalOpen}
        credentials={credentials}
        setCredentials={setCredentials}
        submitAction={handleDeleteUser}
      />
      <AuthForm header="Profile">
        <div className="profileContainer">
          <div className="profileContainer__errors">
            {verifyUser.feedback && (
              <AuthFeedback type={verifyUser.feedback.type} message={verifyUser.feedback.message} />
            )}
            {resetPassword.feedback && (
              <AuthFeedback type={resetPassword.feedback.type} message={resetPassword.feedback.message} />
            )}
            {logout.feedback && (
              <AuthFeedback type={logout.feedback.type} message={logout.feedback.message} />
            )}
            {deleteUser.feedback && (
              <AuthFeedback type={deleteUser.feedback.type} message={deleteUser.feedback.message} />
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
                  onClick={buttonsDisabled ? undefined : handleResetPassword}
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
            <button 
              className="profileContainer__buttonsContainer__button button--delete"
              onClick={buttonsDisabled ? undefined : handleDeleteUser}
            >
              <>
                {deleteUser.loading ? (
                  <FontAwesomeIcon 
                    className="profileContainer__buttonsContainer__button__loadingSpinner" 
                    icon={faSpinner} 
                  />
                ) : (
                  <>
                    <FontAwesomeIcon className="profileContainer__buttonsContainer__button__icon" icon={faUserSlash} />
                    <p>Delete user</p>
                  </>
                )}
              </>
            </button>
            <button 
              className="profileContainer__buttonsContainer__button button--logout" 
              onClick={buttonsDisabled ? undefined : () => dispatch(logoutUser())}
            >
              <>
                {logout.loading ? (
                  <FontAwesomeIcon 
                    className="profileContainer__buttonsContainer__button__loadingSpinner" 
                    icon={faSpinner} 
                  />
                ) : (
                  <>
                    <FontAwesomeIcon className="profileContainer__buttonsContainer__button__icon" icon={faSignOutAlt} />
                    <p>Logout</p>
                  </>
                )}
              </>
            </button>
          </div>
        </div>
      </AuthForm>
    </>
  )
}

export default ProfilePage;
