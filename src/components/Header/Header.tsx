import React from 'react';
import "./header.scss";
import RoundedButton from "../RoundedButton/RoundedButton";
import Tooltip from "../Tooltip/Tooltip";
import { Colors } from "../../utilities/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw } from '@fortawesome/free-solid-svg-icons'

const Header: React.FC = () => {
  return (
    <div className="header">
        <div className="header__group">
          <div className="header__group__container">
            <FontAwesomeIcon icon={faPaw} className="header__group__container__icon" />
            <h1 className="header__main">Pet Tinder</h1>
          </div>
          <h5 className="header__poweredby">
            Powered By {" "}
            <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer">PetFinder.com</a>
          </h5>
        </div>
        <Tooltip text="Sign in to your account">
          <RoundedButton icon={faUser} width={50} height={50} color={Colors.blue} size="1.2rem" />
        </Tooltip>
    </div>
  )
}

export default Header;
