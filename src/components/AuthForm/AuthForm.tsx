import React from 'react';
import "./authForm.scss";
import RoundedButton from "../RoundedButton/RoundedButton";
import Tooltip from "../Tooltip/Tooltip";
import { Colors } from "../../utilities/types/globalTypes";
import googleIcon from "../../assets/googleIcon.svg";
import facebookIcon from "../../assets/facebookIcon.svg";

interface Props {
  children: React.ReactElement;
  formHeader: string;
  formHeaderButton: React.FC;
}

const AuthForm: React.FC<Props> = ({ children, formHeader, formHeaderButton }) => {
  return (
    <div className="authForm">
      <div className="authForm__headerContainer">
        <div>
          <h1 className="authForm__headerContainer__header">{formHeader}</h1>
          <h5 className="authForm__headerContainer__poweredby">
            Powered By {" "}
            <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer">PetFinder.com</a>
          </h5>
        </div>
        {formHeaderButton({})}
      </div>
      <div className="authForm__main">
        {children}
        <div className="authForm__main__buttonsContainer">
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
}

export default AuthForm;
