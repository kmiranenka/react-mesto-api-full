const Card = require('../models/cards');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new ValidationError('Переданы некорректные данные');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: card });
    })
    .catch(() => next(new NotFoundError('Данные не найдены')));
};
