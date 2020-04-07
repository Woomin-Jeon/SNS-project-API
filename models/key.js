const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keySchema = new Schema({
  key: Number,
});

module.exports = mongoose.model('key', keySchema);
