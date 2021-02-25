import React from 'react';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import { Link, withRouter } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  var handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(e, email, password)
    setEmail('');
    setPassword('')
  }

  return (
    <div className="page" >
      <Header headerButton="signin" />
      <form className="login" onSubmit={handleSubmit}>
        <div className="login__form-container">
          <h1 className="login__form-name">Вход</h1>
          <fieldset className="login__input-container">
            <input className="login__item login__item_el_email" id="email-input" name="email" type="email" placeholder="Email" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
            <span id="email-input-error" className="popup__item-error"></span>
          </fieldset>
          <fieldset className="login__input-container">
            <input className="login__item login__item_el_password" id="password-input" name="password" type="password" placeholder="Пароль" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
            <span id="password-input-error" className="popup__item-error"></span>
          </fieldset>
        </div>
        <button onSubmit={handleSubmit} className="login__form-button" type="submit" name="signin">Войти</button>
      </form>
      <InfoTooltip showPopup={props.isPopupOpen} errorPopup={true} onClose={props.onPopupClose} />
    </div>
  );
}

export default withRouter(Login); 