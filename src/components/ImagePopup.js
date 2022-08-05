import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.card ? "popup_opened" : ""
      }`}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          props.onClose();
        }
      }}
    >
      <div className="popup-image__container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup-image__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup-image__caption">
          {props.card ? props.card.name : ""}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;
