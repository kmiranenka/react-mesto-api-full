import React from 'react';
import Header from './Header.js'
import Main from './Main.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';



function MyProfile(props) {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    const jwt = localStorage.getItem('jwt');

    React.useEffect(() => {
        api.getUserInfo(jwt)
            .then((userInfo) => {
                setCurrentUser(userInfo.data);
                console.log(currentUser)

            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    React.useEffect(() => {
        api.getCards(jwt)
            .then((cardsList) => {
                setCards(cardsList.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked, jwt)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);

                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteClick(card) {
        api.deleteCard(card._id, jwt)
            .then((newCard) => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleUpdateUser(nameInfo, jobInfo) {
        api.updateUserInfo(nameInfo, jobInfo, jwt)
            .then((userInfo) => {
                setCurrentUser(userInfo.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(avatarLink) {
        api.updateUserAvatar(avatarLink, jwt)
            .then((userInfo) => {
                setCurrentUser({
                    name: userInfo.data.name,
                    about: userInfo.data.about, avatar: userInfo.data.avatar
                })
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function handleAddPlaceSubmit(cardName, cardLink) {
        api.addCard(cardName, cardLink, jwt)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                console.log(cards)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setCardPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setCardPopupOpen(false);
    }

    return (
        <div className="page" >
            {currentUser && <CurrentUserContext.Provider value={currentUser}>
                <Header headerButton="login" userEmail={props.userEmail} />
                <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteClick} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAddPlaceSubmit} />
                <ImagePopup isOpen={isCardPopupOpen} card={selectedCard} onClose={closeAllPopups} />
                <Footer />
            </CurrentUserContext.Provider>}
        </div>
    );
}

export default MyProfile;