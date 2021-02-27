const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return v.match(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:\\/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/g);
      },
      message: 'Невалидная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return v.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g);
      },
      message: 'Невалидный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return  this.findOne({ email })
    .then((user) => {
      console.log(user)
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
