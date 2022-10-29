const mongoose = require('mongoose');

const testScheme = new mongoose.Schema({
  test: {
    type: String,
    require: true
  },
  qustions: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'qustion'
    }
  ],
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    require: true
  }
})

module.exports = mongoose.model('test', testScheme);