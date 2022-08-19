import React from "react";

function ErrorPopup({ error, onClose }) {
  const { message = ' ', errorCode = null } = error ?? {};

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const errorStatus = errorCode ? `с кодом ${errorCode}` : 'сети';

  return (
    <div
      className={`popup popup__error ${!!error ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup-image__container">
        <button
          className="popup__btn-close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup-image__caption">{`Произошла ошибка ${errorStatus}`}</h3>
        <p className="popup-image__caption">{message}</p>
      </div>
    </div>
  );
}

export default React.memo(ErrorPopup);
