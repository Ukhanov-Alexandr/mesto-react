import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link , setLink ] = React.useState('');

  const handleCardNameChange = (e) => {
    setName(e.target.value)
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    // debugger
    props.onAddPlace({
        name: name,
        link: link,
    })
    setName('');
    setLink('')
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        class="popup__input popup__input_type_caption"
        name="input-name"
        type="text"
        placeholder="Название"
        required
        minlength="2"
        maxlength="30"
        value={name}
        onChange={handleCardNameChange}
      />
      <span class="form__input-error input-name-error"></span>
      <input
        class="popup__input popup__input_type_link"
        name="input-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span class="form__input-error input-link-error"></span>
      <button class="popup__btn-save form__submit" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
