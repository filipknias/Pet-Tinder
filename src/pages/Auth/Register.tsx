import React from 'react';
import "./auth.scss";
import AuthForm from "../../components/AuthForm/AuthForm";
import Tooltip from "../../components/Tooltip/Tooltip";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Colors } from "../../utilities/types";
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";

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
  return (
    <AuthForm formHeader="Register" formHeaderButton={SignInLinkButton}>
      <form className="form">
        <div className="form__formGroup">
          <label htmlFor="email" className="form__formGroup__label">E-mail</label>
          <input type="email" id="email" className="form__formGroup__input" placeholder="example@yahoo.com" required />
        </div>
        <div className="form__formGroup">
          <label htmlFor="password" className="form__formGroup__label">Password</label>
          <input type="password" id="password" className="form__formGroup__input" placeholder="********" required />
        </div>
        <div className="form__formGroup">
          <label htmlFor="passwordConfirm" className="form__formGroup__label">Confirm password</label>
          <input type="password" id="passwordConfirm" className="form__formGroup__input" placeholder="********" required />
        </div>
        <button type="submit" className="form__submit">
          Sign In
        </button>
      </form>
    </AuthForm>
  )
}

export default Register;
