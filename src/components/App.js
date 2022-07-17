import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, withRouter, Link, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import * as auth from '../auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState('');
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
      if (jwt) {
        authorized(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/card');
    }
  }, [loggedIn])
  
  useEffect(() => {
    api.getUserData()
    .then((res)=>{
      setCurrentUser(res);
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
  }, []);
  
  useEffect(() => {
    api.getInitialCards()
    .then((res)=>{
      setCards(res);
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
  }, []);
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    });
  } 
  
  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteCardElement(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id ));
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsLoading(false)
    })
  }
  
  const handleCardClick = (dataCard) => {
    setSelectedCard(dataCard)
  };
  
  function handleButtonDelete(dataCard) {
    setIsDeletePopupOpen(true);
    setDeletedCard(dataCard)  
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };
  
  const handleEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  };
  
  const handleUpdateUser = (formData) => {
    setIsLoading(true);
    api.editUserData(formData)
    .then((res)=>{
      setCurrentUser(res);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsLoading(false)
    })
  }; 
  
  const handleUpdateAvatar = (formData) => {
    setIsLoading(true)
    api.editUserAvatar(formData)
    .then((res)=>{
      setCurrentUser(res);
    })
    .then((res)=>{
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); 
    })
    .finally(() => {
      setIsLoading(false);
    })
  };
  
  const handleAddPlaceSubmit = (formData) => {
    setIsLoading(true)
    api.addCardElement(formData)
    .then((res)=>{
      setCards([res, ...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsLoading(false)
    })
  };
  
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    handleCardDelete(deletedCard);
  }

  const authorized = async (jwt) => {
    const content = await auth.checkToken(jwt).then((res) => {
      if (res) {
        const email = res.data.email;
        console.log(email);
        setLoggedIn(true);
        setUserData(email);
      }
    })
    return content;
  }

  const onRegister = ({ email, password }) => {
    return auth.register(email, password).then((res) => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      return res;
    });
  }

  const onLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((res) => {
        console.log(res.token)
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
        }
      });
  }

  return (
    <div className="page">
<CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} />
          <Switch>
            <Route path="/sign-up">
              <Register loggedIn={loggedIn} onRegister={onRegister}/>
            </Route>
            <Route path="/sign-in">
              <Login loggedIn={loggedIn} onLogin={onLogin}/>
            </Route>
            <Route exact path="/">
              {!loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/card" />}
            </Route>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleButtonDelete}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatar}
              onCardClick={handleCardClick}
              component={Main} />
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading} /> 
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}/>
          <PopupWithForm
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            dataCard={deletedCard}
            name="delete"
            title="Вы уверены?"
            onLoading={isLoading}
            onSubmit={handleSubmitDelete}
            textButtonLoading="Удаление..."
            textButton="Да"/>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}/>
          <ImagePopup
            onClose={closeAllPopups}
            dataCard={selectedCard}/>
          <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;