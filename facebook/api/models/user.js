const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: String,
  pw: String,
  userName: String,
  friends: Array,
});

module.exports = mongoose.model('user', bookSchema);
