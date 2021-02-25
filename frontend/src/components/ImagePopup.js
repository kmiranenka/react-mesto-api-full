import React from 'react';
import closeIcon from '../images/close-icon.svg';


function ImagePopup (props){
    return(
      <section className={`popup ${props.isOpen  && 'popup_opened'} popup_image popup_dark-background `}>
            <div className="popup__image-container">
                {props.card && <>
                <img className="popup__image" src={`${props.card.link}`} alt={props.card.name} />
                <h2 className="popup__image-heading">{props.card.name}</h2>
                </>}
                <button className="popup__btn-close" type="reset" name="close" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть"  />
        </button>
            </div>
        </section>
    );
}

export default ImagePopup;