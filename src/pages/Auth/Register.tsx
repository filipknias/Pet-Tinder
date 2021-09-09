import React, { useRef } from 'react';
import "./auth.scss";
import AuthForm from "../../components/AuthForm/AuthForm";
import Tooltip from "../../components/Tooltip/Tooltip";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import AuthFeedback from "../../components/AuthFormFeedback/AuthFeedback";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Colors } from "../../types/globalTypes";
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";
import { registerUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useHistory } from "react-router-dom";

const SignInLinkButton: React.FC = () => {
  return (
    <Tooltip text="Sign In">
      <Link to={routes.signIn}>
        <RoundedButton color={Colors.blue} style={{ fontSize: "1.6rem", padding: "1rem" }}>
          <FontAwesomeIcon icon={faSignInAlt} />
        </RoundedButton>
      </Link>
    </Tooltip>
  )
}

const Register: React.FC = () => {
  const emailRef = useRef<HTMLInputElement|null>(null);
  const passwordRef = useRef<HTMLInputElement|null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement|null>(null);
  const dispatch = useDispatch();
  const { authFeedback, loading } = useSelector((state: RootState) => state.authReducer);
  const history = useHistory();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current === null || 
        passwordRef.current === null || 
        confirmPasswordRef.current === null
      ) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    dispatch(await registerUser(email, password, confirmPassword, history));
  };
  
  return (
    <AuthForm formHeader="Register" formHeaderButton={SignInLinkButton}>
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
            ref={emailRef} 
            required
          />
        </div>
        <div className="form__formGroup">
          <label htmlFor="password" className="form__formGroup__label">Password</label>
          <input 
            type="password" 
            id="password" 
            className="form__formGroup__input" 
            placeholder="********" 
            ref={passwordRef}
            required 
          />
        </div>
        <div className="form__formGroup">
          <label htmlFor="passwordConfirm" className="form__formGroup__label">Confirm password</label>
          <input 
            type="password"
            id="passwordConfirm" 
            className="form__formGroup__input" 
            placeholder="********" 
            ref={confirmPasswordRef}
            required 
          />
        </div>
        <button type="submit" className="form__submit">
          {loading ?  <FontAwesomeIcon icon={faSpinner} className="form__submit__spinner" /> : "Sign Up"}
        </button>
      </form>
    </AuthForm>
  )
}

export default Register;
