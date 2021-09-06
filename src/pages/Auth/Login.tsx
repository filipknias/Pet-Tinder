import React from 'react';
import "./auth.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import { Colors } from "../../utilities/types/globalTypes";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import routes from "../../utilities/routes";

const RegisterLinkButton: React.FC = () => {
  return (
    <Tooltip text="Create Account">
      <Link to={routes.register}>
        <RoundedButton color={Colors.blue} style={{ fontSize: "1.2rem", padding: "1.3rem 1.2rem" }}>
          <FontAwesomeIcon icon={faUserPlus} />
        </RoundedButton>
      </Link>
    </Tooltip>
  )
};

const Login: React.FC = () => {
  return (
    <AuthForm formHeader="Sign In" formHeaderButton={RegisterLinkButton}>
      <form className="form">
          <div className="form__formGroup">
            <label htmlFor="email" className="form__formGroup__label">E-mail</label>
            <input type="email" id="email" className="form__formGroup__input" placeholder="example@yahoo.com" required />
          </div>
          <div className="form__formGroup">
            <label htmlFor="password" className="form__formGroup__label">Password</label>
            <input type="password" id="password" className="form__formGroup__input" placeholder="********" required />
            <Link to={routes.forgotPassword}>
              <p className="form__formGroup__forgotPassword">Forgot Password ?</p>
            </Link>
          </div>
          <button type="submit" className="form__submit">
            Sign In
          </button>
        </form>
    </AuthForm>
  )
};

export default Login;
