import React from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__btn-edit-avatar"
          onClick={props.onEditAvatar}
        />
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          // style={{ backgroundImage: `url(${userAvatar})` }}
          // alt={userName}
        />
        <h1 className="profile__name">{currentUser.name}</h1>
        <button
          className="profile__btn profile__btn_type_edit"
          type="button"
          aria-label="Редактировать"
          onClick={props.onEditProfile}
        />
        <p className="profile__about">{currentUser.about}</p>
        <button
          className="profile__btn profile__btn_type_add"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card key={item._id} card={item} onClick={props.onCardClick} onCardLike={props.onCardLike} onTrashClick={props.onCardDelete}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
