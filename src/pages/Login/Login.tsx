import React from 'react';
import "./login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";
import { Colors } from "../../utilities/types";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="formContainer">
      <div className="formContainer__headerContainer">
        <div>
          <h1 className="formContainer__headerContainer__header">Sign In</h1>
          <h5 className="formContainer__headerContainer__poweredby">
            Powered By {" "}
            <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer">PetFinder.com</a>
          </h5>
        </div>
        <Tooltip text="Create Account">
          <Link to="register">
            <RoundedButton color={Colors.blue} style={{ fontSize: "1.2rem", padding: "1.3rem 1.2rem" }}>
              <FontAwesomeIcon icon={faUserPlus} />
            </RoundedButton>
          </Link>
        </Tooltip>
      </div>
      <div className="formContainer__main">
        <form className="formContainer__main__form">
          <div className="formContainer__main__form__formGroup">
            <label htmlFor="email" className="formContainer__main__form__formGroup__label">E-mail</label>
            <input type="email" id="email" className="formContainer__main__form__formGroup__input" placeholder="example@yahoo.com" required />
          </div>
          <div className="formContainer__main__form__formGroup">
            <label htmlFor="password" className="formContainer__main__form__formGroup__label">Password</label>
            <input type="text" id="password" className="formContainer__main__form__formGroup__input" placeholder="********" required />
            <p className="formContainer__main__form__formGroup__forgotPassword">Forgot Password ?</p>
          </div>
          <button type="submit" className="formContainer__main__form__submit">
            Sign In
          </button>
        </form>
        <div className="formContainer__main__buttonsContainer">
            <Tooltip text="Google">
              <RoundedButton color={Colors.white} style={{ padding: "1.2rem" }} >
                  <img src={googleIcon} alt="Google" width={30}  />
              </RoundedButton>
            </Tooltip>
            <Tooltip text="Facebook">
              <RoundedButton color={Colors.white} style={{ padding: "1.2rem" }}>
                  <img src={facebookIcon} alt="Facebook" width={30} />
              </RoundedButton>
            </Tooltip>
          </div>
      </div>
    </div>
  )
};

export default Login;
