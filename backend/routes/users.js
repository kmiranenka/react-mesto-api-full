const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, sendUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', sendUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
    avatar: Joi.string(),
  }),
}), updateUserAvatar);

module.exports = router;
