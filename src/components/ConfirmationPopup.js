import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, onSubmit, onClose, isRequesting }) {

  function handleSubmit(e){
    e.preventDefault()
    onSubmit(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      isOpen={!!card}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <button className="popup__btn-save form__submit" type="submit">
        { isRequesting ? 'Удаление..' : 'Да' }
      </button>
    </PopupWithForm>
  );
};

export default React.memo(ConfirmationPopup);