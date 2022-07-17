import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';

const Register = ({ loggedIn, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onRegister({ email, password })
        .then(() => history.push('/sing-in'))
        .catch((err) => setMessage(err.message || 'Что-то пошло не так'));
    }
    return (
        <form className="popup__forma popup__forma_auth" onSubmit={handleSubmit} >
            <h2 className="popup__title popup__title_auth">Регистрация</h2>
            <input className="popup__input popup__input_auth"
                id="user-email"
                name="useremail"
                type="email"
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)} 
                required />
            <input className="popup__input popup__input_auth"
                id="user-password"
                name="userpassword"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={({ target }) => setPassword(target.value)} 
                required />    
            <button className="popup__submit-button popup__submit-button_auth" type="submit" required>Зарегистрироваться</button>
            <p className="popup__text popup__text_auth">Уже зарегистрированы?<Link to='/sing-in' className="popup__text popup__text_auth"> Войти</Link></p>
        </form>
    );
}
export default Register;
