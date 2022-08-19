import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidations from "../hoocks/useFormValidations";
import {addPlaceInitialValues} from '../utils/constants'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isRequesting }) {
  const {
    values,
    isErrors,
    errorMessages,
    handleValueChange,
    setValues,
    resetErrors,
  } = useFormValidations(addPlaceInitialValues);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values["input-place"],
      link: values["input-link"],
    });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({ "input-place": "", "input-link": "" });
      resetErrors();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_caption ${
          isErrors["input-place"] ? "popup__input_type_error" : ""
        }`}
        name="input-place"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values["input-place"]}
        onChange={handleValueChange}
      />
      <span
        className={`form__input-error input-name-error ${
          isErrors["input-place"] ? "popup__input-error_active" : ""
        }`}
      >
        {errorMessages["input-place"]}
      </span>
      <input
        className={`popup__input popup__input_type_link ${
          isErrors["input-link"] ? "popup__input_type_error" : ""
        }`}
        name="input-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={values["input-link"]}
        onChange={handleValueChange}
      />
      <span
        className={`form__input-error input-link-error ${
          isErrors["input-link"] ? "popup__input-error_active" : ""
        }`}
      >
        {errorMessages["input-link"]}
      </span>
      <button
        className={`popup__btn-save form__submit ${
          Object.values(isErrors).some((item) => item)
            ? "form__submit_inactive"
            : ""
        }`}
        type="submit"
        disabled={Object.values(isErrors).some((item) => item)}
      >
        {isRequesting ? 'Создание..' : "Создать"}
      </button>
    </PopupWithForm>
  );
}

export default React.memo(AddPlacePopup);
