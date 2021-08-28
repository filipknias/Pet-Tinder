import React, { useRef, useState } from 'react';
import { Pet } from "../../utilities/types";
import "./tinderCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import Carousel from "react-elastic-carousel";

interface Props {
  animal: Pet;
}

// TODO: check if its correct
const decodeHtml = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const formatPetPublishedDate = (date: string): string => {
  return date.split("T")[0];
}

const preventNullValue = (value: any): string => {
  if (value === null) return "unknown";
  else return value;
}
  
const TinderCard = React.forwardRef<HTMLDivElement, Props>(({ animal }, ref) => {
  const backgroundImage = animal.primary_photo_cropped ? `url(${animal.primary_photo_cropped.large})` : undefined;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement | null>(null); 

  // TODO: make a distance info and location button in header

  const handleOverlayMouseLeave = () => {
    if (overlayRef.current === null) return;
    overlayRef.current.scrollTo(0, 0);
  }
  
  return (
      <div className="tinderCard" ref={ref}>
        <div className="tinderCard__image" style={{ backgroundImage }}>
           {!backgroundImage && (
            <div className="tinderCard__image__nophoto">
              <FontAwesomeIcon icon={faPhotoVideo} className="tinderCard__image__nophoto__icon" />
              <h1 className="tinderCard__image__nophoto__text">No photo</h1>
            </div>
          )}
        </div>
        {/* OVERLAY START */}
        <div 
          className="tinderCard__overlay" 
          onMouseLeave={handleOverlayMouseLeave} 
          ref={overlayRef}
        >
          <div className="tinderCard__overlay__info">
            <h1 className="tinderCard__overlay__info__header">{animal.name}</h1>
            <h4 className="tinderCard__overlay__info__subheader">{animal.age}, {animal.type}</h4>
            {/* OVERLAY HIDDEN START */}
            <div className="tinderCard__overlay__info__hidden">
              <p className="tinderCard__overlay__info__hidden__description">
                {decodeHtml(animal.description)}
              </p>
              {/* OVERLAY CONTENT START */}
              <div className="tinderCard__overlay__info__hidden__content">
                <h3 className="tinderCard__overlay__info__hidden__content__title">About {animal.name}</h3>
                <ul className="tinderCard__overlay__info__hidden__content__list">
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Name: {" "}
                    </span>
                    {animal.name}
                  </li>
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                  <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                    Age: {" "}
                  </span>
                  {animal.age}
                  </li>
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Gender: {" "}
                    </span>
                    {animal.gender}
                  </li>
                  {animal.breeds.primary && (
                      <li className="tinderCard__overlay__info__hidden__content__list__item">
                        <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                          Breed: {" "}
                        </span>
                        {`${animal.breeds.primary} ${animal.breeds.secondary ? `, ${animal.breeds.secondary}` : ""}`}
                      </li>
                  )}
                  {animal.colors.primary && (
                      <li className="tinderCard__overlay__info__hidden__content__list__item">
                        <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                          Coat color: {" "}
                        </span>
                        {`${animal.colors.primary} ${animal.colors.secondary ? `, ${animal.colors.secondary}` : ""}`}
                      </li>
                  )}
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Status: {" "}
                    </span>
                    {animal.status}
                  </li>
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Published at: {" "}
                    </span>
                    {formatPetPublishedDate(animal.published_at)}
                  </li>
                </ul>
                <h3 className="tinderCard__overlay__info__hidden__content__title">Contact</h3>
                <ul className="tinderCard__overlay__info__hidden__content__list">
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Address primary: {" "}
                    </span>
                    {`${preventNullValue(animal.contact.address.address1)}, ${animal.contact.address.city} ${animal.contact.address.country}`}
                  </li>
                  {animal.contact.address.address2 && (
                    <li className="tinderCard__overlay__info__hidden__content__list__item">
                      <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                        Address secondary: {" "}
                      </span>
                      {`${preventNullValue(animal.contact.address.address2)}, ${animal.contact.address.city} ${animal.contact.address.country}`}
                    </li>
                  )}
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Email: {" "}
                    </span>
                    {preventNullValue(animal.contact.email)}
                  </li>
                  <li className="tinderCard__overlay__info__hidden__content__list__item">
                    <span className="tinderCard__overlay__info__hidden__content__list__item__title">
                      Phone: {" "}
                    </span>
                    {preventNullValue(animal.contact.phone)}
                  </li>
                </ul>
                <a href={animal.url} target="_blank">
                  <button className="tinderCard__overlay__info__hidden__content__btn">Read more</button>
                </a>
              </div>
              {/* OVERLAY CONTENT END */}
              {/* OVERLAY SLIDER START */}
              {animal.photos.length > 0 && (
                <div className="tinderCard__overlay__info__hidden__slider">
                  <Carousel itemsToShow={1} isRTL={false}>
                    {animal.photos.map(({ medium }) => (
                      <img 
                        className="tinderCard__overlay__info__hidden__slider__image" 
                        key={medium} 
                        src={medium} 
                        alt="Pet slider image" 
                      />
                    ))}
                  </Carousel>
                </div>
              )}
              {/* OVERLAY SLIDER END */}
            </div>
            {/* OVERLAY HIDDEN END */}
          </div>
        </div>
        {/* OVERLAY END */}
    </div>
  )
})

export default TinderCard;
