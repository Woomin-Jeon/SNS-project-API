const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  pw: String,
  userName: String,
  birth: String,
  location: String,
  email: String,
  friends: Array,
  profile: String,
});

module.exports = mongoose.model('user', userSchema);
