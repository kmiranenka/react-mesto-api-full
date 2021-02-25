"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContent = exports.authorize = exports.register = exports.BASE_URL = void 0;
var BASE_URL = 'https://auth.nomoreparties.co';
exports.BASE_URL = BASE_URL;

var register = function register(email, password) {
  return fetch("".concat(BASE_URL, "/signup"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(function (response) {
    try {
      if (response.status === 201) {
        return response.json();
      }
    } catch (e) {
      return e;
    }
  }).then(function (res) {
    return res;
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.register = register;

var authorize = function authorize(email, password) {
  return fetch("".concat(BASE_URL, "/signin"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    } else {
      return new Error();
    }
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.authorize = authorize;

var getContent = function getContent(token) {
  return fetch("".concat(BASE_URL, "/users/me"), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer ".concat(token)
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    return data;
  });
};

exports.getContent = getContent;