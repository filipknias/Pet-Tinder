import React from 'react';
import "./authForm.scss";
import RoundedButton from "../RoundedButton/RoundedButton";
import Tooltip from "../Tooltip/Tooltip";
import { Colors } from "../../types/globalTypes";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";

interface Props {
  children: React.ReactElement;
  header: string;
  button?: React.FC;
}

const AuthForm: React.FC<Props> = ({ children, header, button }) => {
  return (
    <div className="authForm">
      <div className="authForm__headerContainer">
        <div>
          <h1 className="authForm__headerContainer__header">{header}</h1>
          <h5 className="authForm__headerContainer__poweredby">
            Powered By {" "}
            <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer">PetFinder.com</a>
          </h5>
        </div>
        {button && button({})}
      </div>
      <div className="authForm__main">
        {children}
      </div>
    </div>
  )
}

export default AuthForm;
