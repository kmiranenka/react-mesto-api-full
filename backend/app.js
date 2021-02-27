const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardsRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();

const options = {
  origin: [
  'http://localhost:3000',
  'https://api.mironenko.students.nomoredomains.icu',
 'https://www.api.mironenko.students.nomoredomains.icu',
 'https://mironenko.students.nomoredomains.icu',
 'https://www.mironenko.students.nomoredomains.icu'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  preflightContinue: false,  optionsSuccessStatus: 204,  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],  credentials: true,};
  app.use('*', cors(options));


app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const resourceNotFound = (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
};

app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),
}), createUser);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use(resourceNotFound);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
