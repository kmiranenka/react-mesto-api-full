import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditProfilePopup (props){

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  
  React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 


function handleSubmit(e) {
  e.preventDefault();

  props.onUpdateUser(
    name,
    description
  );
}

    function handleUserNameChange(e) {
        setName(e.target.value);
      }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
      }

    return(
        <PopupWithForm isOpen={props.isOpen} name={"edit"} title={"Редактировать профиль"} onSubmit={handleSubmit} children={<>
            <fieldset className="popup__input-container">
                <input className="popup__item popup__item_el_name" id="name-input" name="name" type="text" placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} onChange={handleUserNameChange}/>
                <span id="name-input-error" className="popup__item-error"></span>
                <input className="popup__item popup__item_el_job" id="job-input" name="job" type="text" placeholder="О себе" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange}/>
                <span id="job-input-error" className="popup__item-error"></span>
            </fieldset>
</>} onClose={props.onClose} buttonText={"Сохранить"}/>
);
}

export default  EditProfilePopup;