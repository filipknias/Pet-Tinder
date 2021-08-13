import React from 'react';
import { Pet } from "../../utilities/types";
import "./tinderCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';

interface Props {
  animal: Pet;
}

const decodeHtml = (html: string) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const TinderCard: React.FC<Props> = ({ animal }) => {
  const backgroundImage = animal.primary_photo_cropped ? `url(${animal.primary_photo_cropped.large})` : undefined;

  // TODO: make a distance info and location button in header
  // TODO: think about what to place in hidden info
  // TODO: make a overlay slider component

  return (
      <div className="tinderCard">
        <div className="tinderCard__image" style={{ backgroundImage }}>
          {!backgroundImage && (
            <div className="tinderCard__image__nophoto">
              <FontAwesomeIcon icon={faPhotoVideo} className="tinderCard__image__nophoto__icon" />
              <h1 className="tinderCard__image__nophoto__text">No photo</h1>
            </div>
          )}
        </div>
        <div className="tinderCard__overlay">
          <div className="tinderCard__overlay__info">
            <h1 className="tinderCard__overlay__info__header">{animal.name}</h1>
            <h4 className="tinderCard__overlay__info__subheader">{animal.age}, {animal.type}</h4>
            <div className="tinderCard__overlay__info__hidden">
              <p className="tinderCard__overlay__info__hidden__description">
                {decodeHtml(animal.description)}
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TinderCard;
