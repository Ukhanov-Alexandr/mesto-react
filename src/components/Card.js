import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
// const cardLikeButtonClassName = `...`; 
  function handleClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onTrashClick(props.card);
  }

  return (
    <article className="element">
      {isOwn ? <button className="element__trash" onClick={handleDeleteClick}></button> : null}
      <img
        className="element__img"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="element__box">
        <h2 className="element__caption">{props.card.name}</h2>
        <button
            className={`element__btn-heart ${isLiked ? 'element__btn-heart_active' : '' }`}
            type="button"
            aria-label="like"
            onClick={handleLikeClick}
          />
        <div className="element__like-counter">{props.card.likes.length}</div>
      </div>
    </article>
  );
};

export default Card;
