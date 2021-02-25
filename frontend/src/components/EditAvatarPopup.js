import React from 'react';
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup (props){

  const inputRef = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  } 

    return(
        <PopupWithForm isOpen={props.isOpen} name={"edit-avatar"} title={"Обновить аватар"} onSubmit={handleSubmit} children={<>
            <fieldset className="popup__input-container">
             <input ref={inputRef} className="popup__item popup__item_el_link" id="avatar-input" name="avatar_link" type="url" placeholder="Ссылка на картинку" required/>
             <span id="avatar-input-error" className="popup__item-error"></span>
            </fieldset>
        </>} onClose={props.onClose} buttonText={"Сохранить"}/>
);
}

export default  EditAvatarPopup;