import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onClick, onCardLike, onTrashClick }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleImageClick() {
    onClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onTrashClick(card);
  }

  return (
    <article className="element">
      {isOwn && <button className="element__trash" onClick={handleDeleteClick}></button>}
      <img
        className="element__img"
        alt={card.name}
        src={card.link}
        onClick={handleImageClick}
      />
      <div className="element__box">
        <h2 className="element__caption">{card.name}</h2>
        <button
          className={`element__btn-heart ${
            isLiked ? "element__btn-heart_active" : ""
          }`}
          type="button"
          aria-label="like"
          onClick={handleLikeClick}
        />
        <div className="element__like-counter">{card.likes.length}</div>
      </div>
    </article>
  );
};

export default React.memo(Card);
