import React from 'react';
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup (props){

  const [tileInput, setTileInput] = React.useState('');
  const [linkInput, setLinkInput] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(tileInput, linkInput);
    setLinkInput('')
    setTileInput('')
  } 

    return(
        <PopupWithForm isOpen={props.isOpen} name={"add"} title={"Новое место"} onSubmit={handleSubmit} onClose={props.onClose} buttonText={"Создать"}>
            <fieldset className="popup__input-container">
                        <input value={tileInput} className="popup__item popup__item_el_title" onChange={(e) => { setTileInput(e.target.value) }} id="title-input" name="title" type="text" placeholder="Название" required minLength="1 " maxLength="30"/>
                        <span id="title-input-error" className="popup__item-error"></span>
                        <input value={linkInput} className="popup__item popup__item_el_link" onChange={(e) => { setLinkInput(e.target.value) }} id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required/>
                        <span id="link-input-error" className="popup__item-error"></span>
                    </fieldset>
          </PopupWithForm>   
);
}

export default AddPlacePopup;