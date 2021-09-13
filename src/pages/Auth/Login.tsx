import React, { useRef } from 'react';
import "./auth.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import Tooltip from "../../components/Tooltip/Tooltip";
import AuthFeedback from "../../components/AuthFormFeedback/AuthFeedback";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Colors } from "../../types/globalTypes";
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";
import { signInUser } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { RootState } from "../../redux/store";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";

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
  const emailRef = useRef<HTMLInputElement|null>(null);
  const passwordRef = useRef<HTMLInputElement|null>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { authFeedback, loading } = useSelector((state: RootState) => state.authReducer);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (emailRef.current === null || passwordRef.current === null) return;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(await signInUser(email, password, history));
  };  

  return (
    <AuthForm header="Sign In" button={RegisterLinkButton}>
      <form className="form" onSubmit={onSubmit}>
        {authFeedback && (
          <AuthFeedback type={authFeedback.type} message={authFeedback.message} />
        )}
        <div className="form__formGroup">
          <label htmlFor="email" className="form__formGroup__label">E-mail</label>
          <input type="email" id="email" ref={emailRef} className="form__formGroup__input" placeholder="example@yahoo.com" required />
        </div>
        <div className="form__formGroup">
          <label htmlFor="password" className="form__formGroup__label">Password</label>
          <input type="password" id="password" ref={passwordRef} className="form__formGroup__input" placeholder="********" required />
          <Link to={routes.forgotPassword}>
            <p className="form__formGroup__forgotPassword">Forgot Password ?</p>
          </Link>
        </div>
        <button type="submit" className="form__submit">
          { loading ?  <FontAwesomeIcon icon={faSpinner} className="form__submit__spinner" /> : "Sign In"}
        </button>
        <div className="form__providersContainer">
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
      </form>
    </AuthForm>
  )
};

export default Login;
