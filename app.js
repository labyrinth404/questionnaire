const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/', (req, res) => res.send('hello'));

app.listen(PORT, () => {
  mongoose
    .connect('mongodb://localhost:27017/qustionnaire', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((res) => console.info(`Успешное подключение к базе ${res.connection}`))
    .catch((err) => console.error(`Mongoose ERROR: ${err}`));
  console.log(`Сервер запущен на порту: ${PORT}`)
});