import React from "react";

const Card = (props) => {

  function handleClick() {
    props.onClick(props.card);
  }

  return (
    <article className="element">
      <button className="element__trash"></button>
      <img className="element__img" alt={props.card.name} src={props.card.link} onClick={handleClick}/>
      <div className="element__box">
        <h2 className="element__caption">{props.card.name}</h2>
        <button
          className="element__btn-heart"
          type="button"
          aria-label="like"
        ></button>
        <div className="element__like-counter">{props.card.likes.length}</div>
      </div>
    </article>
  );
};

export default Card;
