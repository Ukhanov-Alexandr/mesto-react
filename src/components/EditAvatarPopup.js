import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isRequesting}){
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value)
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        name="input-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="form__input-error input-link-error"></span>
      <button className="popup__btn-save form__submit" type="submit" >
        {isRequesting ? 'Сохранение..' : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default React.memo(EditAvatarPopup);