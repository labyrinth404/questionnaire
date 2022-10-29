const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'User-Man'
  },
  avatar: {
    type: String,
    default: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
  },
  role: {
    type: Boolean
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  invite: [
    {
      id: {
        type: String,
        select: false,
        required: true,
      },
      emailGuest: {
        type: String,
        unique: true
      },

    }
  ],
  access: [

  ]
})

userScheme.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userScheme);