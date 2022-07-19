import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
const Login = ({ loggedIn, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setMessage('');
      }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password })
          .then(
            () => {
              console.log("ookk");  
              history.push('/main');
            })
          .then(() => resetForm())
          .catch(
            (err) => setMessage(err)
          );
    }
    console.log(message)
    return (
        <form className="popup__forma popup__forma_auth" onSubmit={handleSubmit}>
            <h2 className="popup__title popup__title_auth">Вход</h2>
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
            <button className="popup__submit-button popup__submit-button_auth" type="submit" required>Войти</button>
        </form>
    );
}
export default Login;

