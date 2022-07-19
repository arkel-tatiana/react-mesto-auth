import React from 'react';
function InfoTooltip(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container">
          <button className="popup__close-button" type="button" aria-label="Закрыть окно4" onClick={props.onClose}></button>
          <form className="popup__forma" name="profile">
              <div className={`${props.regigedIn ? 'popup__logoOk' : 'popup__logoNo'}`}></div>
              <p className="popup__text">
                {props.regigedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
              </p>
              <p className="popup__text_error" 
                 style={props.regigedIn ? { display: "none" }  :  {display: "block" }} >
                {props.message}
              </p>
          </form>
              
        </div>
      </div>    
    );
}
export default InfoTooltip;
