import React from "react";

function PopupWithForm({isOpen, onClose, name, title, onSubmit, children}) {

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup-${name} ${
        isOpen ? "popup_opened" : ""
      }`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={() => onClose()}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form form" name={`${name}`} onSubmit={onSubmit} noValidate>
          {children}
        </form>
      </div>
    </div>
  );
}

export default React.memo(PopupWithForm);
