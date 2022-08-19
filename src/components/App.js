import React, {useCallback, useState, useEffect} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
// import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ErrorPopup from './ErrorPopup' 

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isRequestingServer, setIsRequestingServer] = useState(false);
  const [serverError, setServerError] = useState(null);

  const closeConfirmationPopup = useCallback(() => {
    setDeletedCard(null);
  }, []);

  const openConfirmationPopup = useCallback((card) => {
    setDeletedCard(card);
  }, []);

  const closeErrorPopup = useCallback(() => {
    setServerError(null);
  }, []);

  const openErrorPopup = useCallback((error) => {
    setServerError(error);
  }, []);

  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .unlikeCard(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
        console.dir(err);
        openErrorPopup(err);
      });
    } else {
      api
        .setlikeCard(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
        console.dir(err);
        openErrorPopup(err);
      });
    }
  }, []);

  const handleCardDelete = useCallback((card) => {
    setIsRequestingServer(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeConfirmationPopup();
      })
      .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
      console.dir(err);
      openErrorPopup(err);
    })
      .finally(() => {
        setIsRequestingServer(false);
      });
  }, []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setIsEditAvatarPopupOpen(true);
  }, []);

  const handleEditProfileClick = useCallback(() => {
    setIsEditProfilePopupOpen(true);
  }, []);

  const handleAddPlaceClick = useCallback(() => {
    setIsAddPlacePopupOpen(true);
  }, []);

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }, []);

  useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard
    ) {
      function handleEscClose(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEscClose);

      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
  ]);

  const handleUpdateUser = useCallback((data) => {
    setIsRequestingServer(true);
    api
      .patchProfile(data)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
      console.dir(err);
      openErrorPopup(err);
    })
      .finally(() => {
        setTimeout( () => {setIsRequestingServer(false)}, 300);
      });
  }, []);

  const handleUpdateAvatar = useCallback((data) => {
    setIsRequestingServer(true);
    api
      .setNewAvatar(data)
      .then((res) => {
        console.dir(res)
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
      console.dir(err);
      openErrorPopup(err);
    })
      .finally(() => {
        setTimeout( () => {setIsRequestingServer(false)}, 300);
      });
  }, []);

  const handleAddPlaceSubmit = useCallback((data) => {
    setIsRequestingServer(true);
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
      console.dir(err);
      openErrorPopup(err);
    })
      .finally(() => {
        setTimeout( () => {setIsRequestingServer(false)}, 300);
      });
  }, [cards]);

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([user, cards]) => {
        setСurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {console.log(`Ошибка с кодом: ${err.errorCode}`);
      console.dir(err);
      openErrorPopup(err);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={openConfirmationPopup}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRequesting={isRequestingServer}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isRequesting={isRequestingServer}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRequesting={isRequestingServer}
        />
        <ConfirmationPopup
          card={deletedCard}
          onSubmit={handleCardDelete}
          onClose={closeConfirmationPopup}
          isRequesting={isRequestingServer}
        />
        <ImagePopup
          title="Посмотреть в полном размере"
          name="image"
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ErrorPopup 
          error={serverError}
          onClose={closeErrorPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default React.memo(App);
