import React from 'react';
function InfoTooltip(props) {
    return (
        <div classname={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
        <div classname="popup__container">
          <button classname="popup__close-button" type="button" aria-label="Закрыть окно4" onClick={props.onClose}></button>
          <form classname="popup__forma" name="profile" novalidate>
              <div classname="popup__logoOk"></div>
              <p classname="popup__text">Вы успешно зарегистрировались!</p>
          </form>
        </div>
      </div>    
    );
}
export default InfoTooltip;
