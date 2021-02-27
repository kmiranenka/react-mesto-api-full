const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, sendUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', sendUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateUserAvatar);

module.exports = router;
