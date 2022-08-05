import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__btn-edit-avatar"
          onClick={props.onEditAvatar}
        />
        <img
          className="profile__avatar"
          src={userAvatar}
          // style={{ backgroundImage: `url(${userAvatar})` }}
          // alt={userName}
        />
        <h1 className="profile__name">{userName}</h1>
        <button
          className="profile__btn profile__btn_type_edit"
          type="button"
          aria-label="Редактировать"
          onClick={props.onEditProfile}
        />
        <p className="profile__about">{userDescription}</p>
        <button
          className="profile__btn profile__btn_type_add"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card key={item._id} card={item} onClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
