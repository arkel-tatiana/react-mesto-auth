import headerLogo from '../images/logo.svg';
import React, { useState } from 'react'
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
function Header(props) {
  const [isMobile, setIsMobile] = useState(false);
  function handleButtonHeader() {

  }
    return (
        <header className={`${!isMobile ? 'header' : 'header header_mobile'}`}>
          <div className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }}></div>
          <Route path="/sign-up">
               <Link to="/sing-in" className={`${!props.loggedIn ? 'header__link' : 'header__link_hidden'}`}>Войти</Link>
           </Route>
           <Route path="/sign-in">
               <Link to="/sing-up" className={`${!props.loggedIn ? 'header__link' : 'header__link_hidden'}`}>Регистрация</Link>
           </Route>
          <div className={`${props.loggedIn ? 'header__content' : 'header__content_hidden'}`}>
            <div className={`${!isMobile ? 'header__content-login' : 'header__content-login header__content-login_mobile'}`}>
              <p className="header__username">5555</p>
              <button className="header__button-exit">Выйти</button>
            </div>
            <button
             className={`${!isMobile ? 'header__button-mobile' : 'header__button-close'}`}
             onClick = {handleButtonHeader}
             aria-label="Открыть информацию о пользователе">
            </button> 
          </div>
        </header>
    );
  }
  
export default Header;
