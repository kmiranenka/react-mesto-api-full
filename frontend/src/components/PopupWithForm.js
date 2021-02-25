import React from 'react';
import closeIcon from '../images/close-icon.svg';
import { formElement } from '../utils/FormValidator.js';

function PopupWithForm (props){
 
    React.useEffect(() => {
        formElement.enableValidation();
    }, [])

    return(
    <>
    <section className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
    <div className="popup__form-container">
        <form className={`popup__form popup__form_${props.name}`} name={`${props.name}_form`} noValidate onSubmit={props.onSubmit}>
            <h2 className="popup__heading">{props.title}</h2>
            {props.children}
            <button className="popup__btn-save" type="submit" name="save">{props.buttonText}</button>
        </form>
        <button className="popup__btn-close" type="reset" name="close" onClick={props.onClose}>
        <img className="popup__close-icon" src={closeIcon} alt="Закрыть"/>
        </button>
    </div>
</section>
    </>
);
}

export default PopupWithForm;