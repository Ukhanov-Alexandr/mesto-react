import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  React.useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEscClose);

      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        card={selectedCard}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          class="popup__input popup__input_type_name"
          name="input-name"
          type="text"
          placeholder="Имя"
          required
          minlength="2"
          maxlength="40"
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
        />
        <span class="form__input-error input-about-error"></span>
        <button class="popup__btn-save form__submit" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          class="popup__input popup__input_type_caption"
          name="input-name"
          type="text"
          placeholder="Название"
          required
          minlength="2"
          maxlength="30"
        />
        <span class="form__input-error input-name-error"></span>
        <input
          class="popup__input popup__input_type_link"
          name="input-link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span class="form__input-error input-link-error"></span>
        <button class="popup__btn-save form__submit" type="submit">
          Создать
        </button>
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          class="popup__input popup__input_type_link"
          name="input-link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span class="form__input-error input-link-error"></span>
        <button class="popup__btn-save form__submit" type="submit">
          Сохранить
        </button>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="delete">
        <h3 class="popup__title">Вы уверены?</h3>
        <button class="popup__btn-save form__submit" type="submit">
          Да
        </button>
      </PopupWithForm>
      <ImagePopup
        title="Посмотреть в полном размере"
        name="image"
        card={selectedCard}
        onClose={closeAllPopups}
      ></ImagePopup>
    </div>
  );
}

export default App;
