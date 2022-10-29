const mongoose = require('mongoose');

const questionScheme = new mongoose.Schema({
  question: {
    type: String,
    require: true
  },
  answers: [
    {
      right: {
        type: Boolean,
        require: true,
        default: false
      },
      answer: {
        type: String,
        require: true
      }
    }
  ],
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    require: true
  }
})

module.exports = mongoose.model('question', questionScheme);