import React from 'react';
import logo from '../images/logo-mesto.svg';
import menu from '../images/menu-burger.svg';
import closeIcon from '../images/close-icon.svg';
import { Link, useHistory } from 'react-router-dom';

function Header (props){
    const [showMenu, setShowMenu] = React.useState(false)
    const onClick = () => setShowMenu(!showMenu) 

    const history = useHistory();

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

    return(<header className="header">
        { showMenu && <div className="header__logo-menu_mobile">
            <p className="header__email header__email_mobile">{props.userEmail}</p> 
            <a onClick={signOut} className="header__logo-button header__logo-button_mobile">Выйти</a>
        </div>}
        <div className="header__logo-container">
        <img className="header__logo" src={logo} alt="Mesto лого"/>
        {props.headerButton ==="signin" && <a className="header__logo-button" href="./sign-up">Регистрация</a>}
        {props.headerButton ==="signup" && <a className="header__logo-button" href="./sign-in">Войти</a>}
        {props.headerButton ==="login" && <div className="header__email-container"><p className="header__email">{props.userEmail}</p> <a className="header__logo-button" onClick={signOut}>Выйти</a></div>}
        {props.headerButton ==="login" && !showMenu && <div className="header__menu-button" onClick={onClick}><img src={menu}></img></div>}
        {props.headerButton ==="login" && showMenu && <div className="header__close-button" onClick={onClick}><img  className="header__close-icon" src={closeIcon}></img></div>}

        </div>
    <hr className="header__line"/>
</header>);
}

export default Header;
