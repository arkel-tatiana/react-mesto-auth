
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
  }
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(this._getResponseData)
  }
  addCardElement(dataValue) {
    return fetch(this._baseUrl + '/cards/', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataValue.name,
        link: dataValue.link
      })
    })
    .then(this._getResponseData)
  };  
  deleteCardElement(idCard) {
      return fetch(this._baseUrl + '/cards/' + idCard, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData)
  };
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
    headers: this._headers
    })
    .then(this._getResponseData)
  };
  editUserData(formData) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
      })
      .then(this._getResponseData)
  }
  editUserAvatar(dataValue) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataValue
      })
      })
      .then(this._getResponseData)
  }
  changeLikeCardStatus(idCard, status) {
    return fetch(this._baseUrl + '/cards/likes/' + idCard, {
      method: status ? 'PUT' : 'DELETE',
      headers: this._headers
      })
      .then(this._getResponseData)    
  };
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 
};
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'cb8c837c-2a8a-4df5-98d7-679ca756a7f3',
    'Content-Type': 'application/json'
  }
});
