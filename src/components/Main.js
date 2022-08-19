import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = React.useContext(CurrentUserContext);
  const cardsElements = cards.map((item) => (
    <Card
      key={item._id}
      card={item}
      onClick={onCardClick}
      onCardLike={onCardLike}
      onTrashClick={onCardDelete}
    />
  ));

  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__btn-edit-avatar"
          onClick={onEditAvatar}
        />
        <img
          className="profile__avatar"
          src={currentUser.avatar}
        />
        <h1 className="profile__name">{currentUser.name}</h1>
        <button
          className="profile__btn profile__btn_type_edit"
          type="button"
          aria-label="Редактировать"
          onClick={onEditProfile}
        />
        <p className="profile__about">{currentUser.about}</p>
        <button
          className="profile__btn profile__btn_type_add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cardsElements}
      </section>
    </main>
  );
}

export default React.memo(Main);
