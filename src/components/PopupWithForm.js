import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          props.onClose();
        }
      }}
    >
      <div className="popup__container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={() => props.onClose()}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form form" name={`${props.name}`} novalidate>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
