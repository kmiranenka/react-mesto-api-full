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

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                return this._getResponseData(res);
            });

    }

    getCards() {
        return fetch(`${this._url}/cards`, {
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    updateUserInfo(nameInfo, jobInfo) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': this._headers.contentType
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

    addCard(cardName, cardLink) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': this._headers.contentType
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

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._headers.authorization,
                }
            })
            .then((res) => {
                return this._getResponseData(res);
            })

    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                    method: 'PUT',
                    headers: {
                        authorization: this._headers.authorization,
                    }
                })
                .then((res) => {
                    return this._getResponseData(res);
                })

        } else {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._headers.authorization,
                    }
                })
                .then((res) => {
                    return this._getResponseData(res);
                })

        }
    }

    updateUserAvatar(imageLink) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': this._headers.contentType
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