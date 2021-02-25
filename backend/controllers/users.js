const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/users');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.sendUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: user });
    });
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const {
        name, about, avatar, email,
      } = req.body;
      User.create({
        name, about, avatar, email, hash,
      });
    })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Переданы некорректные данные');
      }
      res.send({ data: user });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Переданы некорректные данные');
      }
      res.send({ data: user });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Переданы некорректные данные');
      }
      res.send({ data: user });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ValidationError('Переданы некорректные данные');
      }
      const token = jwt.sign({ _id: user._id }, '5ff9f3fae75a5de2804f627b86d2ad2f1db15fb324d02e9075c47494eaa9ddc8', { expiresIn: '7d' });

      res.cookie('token', token, { httpOnly: true });
    });
};
