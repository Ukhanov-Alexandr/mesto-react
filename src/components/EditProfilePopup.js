import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValidations from "../hoocks/useFormValidations";
import {editProfileInitialValues} from '../utils/constants'

function EditProfilePopup({isOpen, onClose, onUpdateUser, isRequesting}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, isErrors, errorMessages, handleValueChange, setValues, resetErrors} = useFormValidations(editProfileInitialValues);

  React.useEffect(() => {
    if (!!currentUser.name && !!currentUser.about && isOpen) {
      setValues({ "input-name": currentUser.name, "input-about": currentUser.about });
      resetErrors();
    }
  }, [currentUser.name, currentUser.about, isOpen]); 

  function handleSubmit(e){
    e.preventDefault();
    onUpdateUser({
        name: values["input-name"],
        about: values["input-about"]
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_type_name ${isErrors["input-name"] ? 'popup__input_type_error' : '' }`}
        name="input-name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={values["input-name"]}
        onChange={handleValueChange}
      />
      <span className={`form__input-error input-about-error ${isErrors["input-name"] ? 'popup__input-error_active' : '' }`}>{errorMessages["input-name"]}</span>
      <input
        className={`popup__input popup__input_type_about ${isErrors["input-about"] ? 'popup__input_type_error' : '' }`}
        name="input-about"
        type="text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values["input-about"]}
        onChange={handleValueChange}
      />
      <span className={`form__input-error input-about-error ${isErrors["input-about"] ? 'popup__input-error_active' : '' }`}>{errorMessages["input-about"]}</span>
      <button 
        className={`popup__btn-save form__submit ${Object.values(isErrors).some((item) => item) ? 'form__submit_inactive' : ''}`} 
        type="submit" 
        disabled={Object.values(isErrors).some((item) => item)} >
        {isRequesting ? 'Сохранение..' : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default React.memo(EditProfilePopup);
