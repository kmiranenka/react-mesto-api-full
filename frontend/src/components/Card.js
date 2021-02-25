import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`


  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (<li className="element" >
    {isOwn && <button className="element__trash"
      type="button" onClick={handleDeleteClick}> </button>}
    <div className="element__photo"
      style={{
        backgroundImage: `url(${props.card.link})`, backgroundSize: `cover`
      }} onClick={handleClick}></div>
    <p className="element__name">{props.card.name}</p>
    <div className="element__likes-container" >
      <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
      </button>  {props.card.likes.length > 0 && <p className={`element__likes-number`} >{props.card.likes.length}</p>}
    </div>
  </li>
  );
}

export default Card;