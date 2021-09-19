import React, { useRef } from 'react';
import "./auth.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import AuthFeedback from "../../components/AuthFormFeedback/AuthFeedback";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Colors } from "../../types/global";
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";
import { sendResetPasswordEmail } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

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

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement|null>(null);
  const { resetPassword } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPassword.loading) return;
    if (emailRef.current === null) return;
    dispatch(sendResetPasswordEmail(emailRef.current.value));
  };

  return (
    <AuthForm header="Reset password" button={ProfileLinkButton}>
      <form className="form" onSubmit={onSubmit}>
        {resetPassword.feedback && (
          <AuthFeedback type={resetPassword.feedback.type} message={resetPassword.feedback.message} />
        )}
        <div className="form__formGroup">
          <label htmlFor="email" className="form__formGroup__label">E-mail</label>
          <input type="email" id="email" ref={emailRef} className="form__formGroup__input" placeholder="example@yahoo.com" required />
        </div>
        <button type="submit" className="form__submit">
          { resetPassword.loading ?  <FontAwesomeIcon icon={faSpinner} className="form__submit__spinner" /> : "Send reset password e-mail"}
        </button>
      </form>
    </AuthForm>
  )
}

export default ForgotPassword;
