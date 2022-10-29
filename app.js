const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const router  = require('./routes/index');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

const consoleLog = (req, res, next) => {
  console.log(req.body);
  next();
};

app.use(bodyParser.json());

app.post('/signin', consoleLog, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);

app.post('/signup', consoleLog, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http|https):\/\/([\w.]+\/?)\S*/),
  }),
}), createUser);

app.use(auth, router);

app.use(errors());

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  };

  mongoose
    .connect('mongodb://127.0.0.1:27017/qustionnaire', options)
    .then((res) => console.info(`Успешное подключение к базе ${res.connection.client.s.url}`))
    .catch((err) => console.error(`Mongoose ERROR: ${err}`));
  console.log(`Сервер запущен на порту: ${PORT}`)
});