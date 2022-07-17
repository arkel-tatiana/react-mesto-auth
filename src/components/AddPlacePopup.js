import React from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup ({isOpen, onClose, onAddPlace, onLoading}) {
    const [newCardName, setNewCardName] = React.useState('');
    const [newCardLink, setNewCardLink] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name: newCardName,
          link: newCardLink
        });
    } 
    return (
        <PopupWithForm
          name="cards"
          title="Новое место"
          onLoading={onLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          textButtonLoading="Сохранение..."
          textButton="Создать"
        >  
          <input className="popup__input popup__input_add popup__input_name_namecards"
            onChange={event => setNewCardName(event.target.value)}
            id="namecards-input"
            name="namecards"
            type="text"
            required
            placeholder="Название"/>
          <input className="popup__input popup__input_add popup__input_name_linkcards popup__input_placeholder"
            onChange={event => setNewCardLink(event.target.value)}
            id="linkcards-input"
            name="linkcards"
            type="url"
            placeholder="Ссылка на картинку"
            required />
        </PopupWithForm>  
    );
}
export default AddPlacePopup;

