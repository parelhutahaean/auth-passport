const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  role: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
