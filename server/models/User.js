const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
  googleID: String,
  name: String,
  credits: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('users', userSchema);
