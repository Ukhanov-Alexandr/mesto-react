import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleCardNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    })
  }

  useEffect(()=>{
    setName("");
    setLink("");
  },[isOpen, onClose]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_caption"
        name="input-name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleCardNameChange}
      />
      <span className="form__input-error input-name-error"></span>
      <input
        className="popup__input popup__input_type_link"
        name="input-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="form__input-error input-link-error"></span>
      <button className="popup__btn-save form__submit" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
