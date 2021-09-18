import React, { useState } from 'react';
import "./auth.scss";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthFeedback from "../../components/AuthFormFeedback/AuthFeedback";
import { Colors } from "../../types/global";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import routes from "../../utilities/routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { editProfile } from "../../redux/actions/authActions";

const ProfileLinkButton: React.FC = () => {
  return (
    <Tooltip text="Profile">
      <Link to={routes.profile}>
        <RoundedButton color={Colors.blue} style={{ fontSize: "1.2rem", padding: "1.1rem 1.2rem" }}>
          <FontAwesomeIcon icon={faUser} />
        </RoundedButton>
      </Link>
    </Tooltip>
  )
};

const EditProfile: React.FC = () => {
  const { user, loading, authFeedback } = useSelector((state: RootState) => state.authReducer);
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [displayName, setDisplayName] = useState<string>(user ? user.displayName : "");
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (user && user.email === email && user.displayName === displayName) return;
    dispatch(editProfile(email, displayName));
  };

  return (
    <AuthForm header="Edit profile" button={ProfileLinkButton}>
      <form className="form" onSubmit={onSubmit}>
        {authFeedback && (
          <AuthFeedback type={authFeedback.type} message={authFeedback.message} />
        )}
        <div className="form__formGroup">
          <label htmlFor="email" className="form__formGroup__label">E-mail</label>
          <input 
            type="email" 
            id="email" 
            className="form__formGroup__input" 
            placeholder="example@yahoo.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form__formGroup">
          <label htmlFor="displayName" className="form__formGroup__label">Display name</label>
          <input 
            type="text" 
            id="displayName" 
            className="form__formGroup__input" 
            placeholder="Display name" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="form__submit">
          { loading ?  <FontAwesomeIcon icon={faSpinner} className="form__submit__spinner" /> : "Edit your profile"}
        </button>
      </form>
    </AuthForm>
  )
}

export default EditProfile;
