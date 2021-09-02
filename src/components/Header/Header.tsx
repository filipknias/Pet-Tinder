import React from 'react';
import "./header.scss";
import RoundedButton from "../RoundedButton/RoundedButton";
import Tooltip from "../Tooltip/Tooltip";
import { Colors } from "../../utilities/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaw, faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import routes from "../../utilities/routes";

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
          <Link to={routes.index}>
            <Tooltip text="Pets">
              <RoundedButton color={Colors.purple} style={{ fontSize: "1rem" }}> 
                <FontAwesomeIcon icon={faPaw} />
              </RoundedButton>
            </Tooltip>
          </Link>
          <Tooltip text="Likes">
            <RoundedButton color={Colors.green} style={{ fontSize: "1rem" }}> 
              <FontAwesomeIcon icon={faHeart} />
            </RoundedButton>
          </Tooltip>
          <Tooltip text="Profile">
            <Link to={routes.signIn}>
              <RoundedButton color={Colors.blue} style={{ fontSize: "1rem" }}> 
                <FontAwesomeIcon icon={faUser} />
              </RoundedButton>
            </Link>
          </Tooltip>
        </div>
    </div>
  )
}

export default Header;
