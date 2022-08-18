import React from "react";
import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props){
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    // debugger
    props.onUpdateAvatar(avatarRef.current.value)
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        class="popup__input popup__input_type_link"
        name="input-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span class="form__input-error input-link-error"></span>
      <button class="popup__btn-save form__submit" type="submit" >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;