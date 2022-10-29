const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

const getUser = (req, res) => {
  let { id } = req.params;
  if (id === 'me') {
    id = req.user._id;
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Пользователь по указанному _id не найден',
        });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      User.create({ ...req.body })
        .then((user) => {
          const {
            name,
            about,
            avatar,
            _id,
            email,
          } = user;
          res.status(201).send({
            name,
            about,
            avatar,
            _id,
            email,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.name === 'ValidationError') {
            return res.status(400).send({
              message: 'Переданы некорректные данные при создании пользователя',
            });
          }
          if (err.code === 11000) {
            return res.status(409).send({ meassage: 'Пользователь уже существует' });
          }
          return res.status(500).send({ message: 'Ошибка по умолчанию' });
        });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

const login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      /* res.cookie('token', token, { httpOnly: true }); */
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
