import React from 'react';
import Header from './Header.js'
import InfoTooltip from './InfoTooltip.js'
import { Link, withRouter } from 'react-router-dom';


function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPopup, setShowPopup] = React.useState(false);
    const [errorPopup, setErrorPopup] = React.useState(false);


    var handleSubmit = (e) => {
        e.preventDefault();
        if (password && email) {
            props.handleRegister(e, email, password);
            setEmail('');
            setPassword('');
        }
    }


    return (
        <div className="page" >
            <Header headerButton="signup" />
            <form className="login" onSubmit={handleSubmit}>
                <div className="login__form-container">
                    <h1 className="login__form-name">Регистрация</h1>
                    <fieldset className="login__input-container">
                        <input className="login__item login__item_el_email" id="email-input" value={email} name="email" type="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                        <span id="email-input-error" className="popup__item-error"></span>
                    </fieldset>
                    <fieldset className="login__input-container">
                        <input className="login__item login__item_el_password" id="password-input" value={password} name="password" type="password" placeholder="Пароль" required onChange={(e) => { setPassword(e.target.value) }} />
                        <span id="password-input-error" className="popup__item-error"></span>
                    </fieldset>
                </div>
                <button onSubmit={handleSubmit} className="login__form-button" type="submit" name="signup">Зарегистрироваться</button>
                <p className="login__text">Уже зарегистрированы? <a className="login__link" href="./sign-in">Войти</a></p>
            </form>
            <InfoTooltip showPopup={props.isPopupOpen} errorPopup={props.errorPopup} onClose={props.onPopupClose} />
        </div>
    );
}

export default withRouter(Register); 