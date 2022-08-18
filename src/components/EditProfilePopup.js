import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description , setDescription ] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleSubmit(e){
    e.preventDefault();
    props.onUpdateUser({
        name,
        about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        class="popup__input popup__input_type_name"
        name="input-name"
        type="text"
        placeholder="Имя"
        required
        minlength="2"
        maxlength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span class="form__input-error input-name-error"></span>
      <input
        class="popup__input popup__input_type_about"
        name="input-about"
        type="text"
        placeholder="О себе"
        required
        minlength="2"
        maxlength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span class="form__input-error input-about-error"></span>
      <button class="popup__btn-save form__submit" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
