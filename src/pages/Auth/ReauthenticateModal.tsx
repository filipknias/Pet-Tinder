import React from 'react';
import "./auth.scss";
import Modal from "../../components/Modal/Modal";
import { Credentials } from "./EditProfile";
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";
 
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  credentials: Credentials;
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>;
  submitAction: () => void;
}

const ReauthenticateModal: React.FC<Props> = ({ open, setOpen, credentials, setCredentials, submitAction }) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAction();
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen} style={{ width: "500px" }}>
        <form className="form" onSubmit={onSubmit}>
          <div>
            <h2 className="form__header">Before you continue</h2>
            <p className="form__subheader">In order to change your profile credentials you have to reauthenticate again</p>
          </div>
          <div className="form__formGroup">
            <label htmlFor="email" className="form__formGroup__label">E-mail</label>
            <input 
              type="email" 
              id="email" 
              className="form__formGroup__input" 
              placeholder="example@yahoo.com" 
              value={credentials.email || ""}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
              value={credentials.password || ""}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required 
            />
            <Link to={routes.forgotPassword}>
              <p style={{ marginTop: 8 }} className="form__formGroup__forgotPassword">Forgot Password ?</p>
            </Link>
          </div>
          <button type="submit" className="form__submit">Confirm</button>
        </form>
    </Modal>
  )
}

export default ReauthenticateModal;
