import headerLogo from '../images/logo.svg';
import React, { useState } from 'react'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
function Header({loggedIn, userData, signOut}) {
  const [isMobile, setIsMobile] = useState(false);
  function handleButtonHeader() {
    !isMobile ? setIsMobile(true) : setIsMobile(false)
  }
  function exitProfile() {
    setIsMobile(false);
    signOut()
  }
  return (
        <header className={`${!isMobile ? 'header' : 'header header_mobile'}`}>
          <div className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }}></div>
          <div className="header__content">
            <Route path="/sign-in">
                <Link to="/sign-up" className={`${!loggedIn ? 'header__link' : 'header__link_hidden'}`}>Регистрация</Link>
            </Route>
            <Route path="/sign-up">
              <Link to="/sign-in" className={`${!loggedIn ? 'header__link' : 'header__link_hidden'}`}>Войти</Link>
            </Route>
            <div className={`${loggedIn ? 'header__content-login_visible' : ''}
             ${!isMobile ? 'header__content-login' : 'header__content-login header__content-login_mobile'}`}>
              <p className="header__username">{userData}</p>
              <button className="header__button-exit" onClick = {exitProfile} >Выйти</button>
            </div>
            <button
             className={`${!isMobile ? 'header__button-mobile' : 'header__button-close'}`}
             onClick = {handleButtonHeader}
             style={!loggedIn ? { display: "none" }  :  {display: "block" }}
             aria-label="Открыть информацию о пользователе">
            </button> 
          </div>  
        </header>
    );
  }
  
export default Header;


