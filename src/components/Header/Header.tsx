import React from 'react';
import "./header.scss";
import RoundedButton from "../RoundedButton/RoundedButton";
import Tooltip from "../Tooltip/Tooltip";
import { Colors } from "../../utilities/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw, faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <div className="header">
        <div className="header__group">
          <div className="header__group__container">
            <FontAwesomeIcon icon={faPaw} className="header__group__container__icon" />
            <h1 className="header__group__container__title">Pet Tinder</h1>
          </div>
          <h5 className="header__group__container__poweredby">
            Powered By {" "}
            <a href="https://www.petfinder.com/" target="_blank" rel="noreferrer">PetFinder.com</a>
          </h5>
        </div>
        <div className="header__buttons">
          <Tooltip text="Likes">
            <RoundedButton color={Colors.green} iconFontSize="1rem"> 
              <FontAwesomeIcon icon={faHeart} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Profile">
            <RoundedButton color={Colors.blue} iconFontSize="1rem"> 
              <FontAwesomeIcon icon={faUser} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Info">
            <RoundedButton color={Colors.purple} iconFontSize="1rem"> 
              <FontAwesomeIcon icon={faInfoCircle} />
            </RoundedButton>
          </Tooltip>
        </div>
    </div>
  )
}

export default Header;
