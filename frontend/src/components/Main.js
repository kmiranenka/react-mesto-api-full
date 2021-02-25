import React from 'react';
import editAvatarIcon from '../images/edit-avatar-icon.svg'
import editIcon from '../images/edit-icon.svg'
import addIcon from '../images/add-icon.svg'
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {
 
    const currentUser = React.useContext(CurrentUserContext);

    return ( <main className = "content">
        <section className = "profile">
        <div className = "profile__avatar-container">
        <button onClick = {props.onEditAvatar} className = "profile__edit-avatar-button" type = "button" name = "avatar"> 
        <img className = "profile__add-icon" src = {editAvatarIcon} alt = "Редактировать аватар" /> </button> 
        <div className = "profile__avatar" style = {{backgroundImage: `url(${currentUser.avatar})`}}> 
        </div> 
        </div>  
        <div className = "profile__info info">
        <div className = "info__container">
        <h1 className = "info__name"> {currentUser.name} </h1> 
        <p className = "info__job-title" > {currentUser.about} </p> 
        </div> 
        <button onClick = {props.onEditProfile} className = "info__edit-button" type = "button" name = "edit"> 
        < img className = "info__edit-icon" src = {editIcon} alt = "Редактировать" /> 
        </button> 
        </div> 
        <button onClick = {props.onAddPlace} className = "profile__add-button" type = "button" name = "add"> 
        < img className = "profile__add-icon" src = {addIcon} alt = "Добавить" /> </button> 
        </section >

        <section className = "elements" > {
            props.cards.map((card) => {
                return ( 
                    <Card key = {card._id} onCardClick = {props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} card = {card} /> 
                 )
            })
        } 
        </section>  
        </main> );
}

export default Main;