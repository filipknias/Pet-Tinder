import React from 'react';
import "./authFeedback.scss";
import { AuthFeedbackType } from "../../types/global";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  type: AuthFeedbackType;
  message: string;
}

const AuthFeedback:React.FC<Props> = ({ type, message }) => {
  return (
    <div className={`authFeedback ${type === "success" ? "authFeedback--success" : "authFeedback--fail"}`}>
      <FontAwesomeIcon className="authFeedback__icon" icon={type === "success" ? faCheckCircle : faTimesCircle} />
      <div className="authFeedback__content">
        <h2 className="authFeedback__content__header">{type === "success" ? "Success" : "Fail"}</h2>
        <p className="authFeedback__content__message">{message}</p>
      </div>
    </div>
  )
}

export default AuthFeedback;
