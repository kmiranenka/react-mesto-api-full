import { apiConfig } from './constants.js'
class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
    }

    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                return this._getResponseData(res);
            });

    }

    getCards(token) {
        return fetch(`${this._url}/cards`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    updateUserInfo(nameInfo, jobInfo, token) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': this._headers.contentType,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: nameInfo,
                    about: jobInfo
                })
            })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    addCard(cardName, cardLink, token) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': this._headers.contentType,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    deleteCard(cardId, token) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    changeLikeCardStatus(cardId, isLiked, token) {
        if (!isLiked) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then((res) => {
                    return this._getResponseData(res);
                })

        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then((res) => {
                    return this._getResponseData(res);
                })

        }
    }

    updateUserAvatar(imageLink, token) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': this._headers.contentType,
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    avatar: imageLink
                })
            })
            .then((res) => {
                return this._getResponseData(res);
            })
    }
}

export const api = new Api(apiConfig);