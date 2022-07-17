import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function EditProfilePopup ({isOpen, onClose, onUpdateUser, onLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
    } 
    return (
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          onLoading={onLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          textButtonLoading="Сохранение..."
          textButton="Сохранить"
        >
        <input className="popup__input popup__input_name_username"
          id="username-input" name="username"
          onChange={event => setName(event.target.value)}
          type="text"
          required
          placeholder="имя" />
        <input className="popup__input popup__input_name_userjob"
          id="userjob-input"
          name="userjob"
          onChange={event => setDescription(event.target.value)}
          type="text"
          required
          placeholder="о себе" />
        </PopupWithForm>
    );
}
export default EditProfilePopup;

