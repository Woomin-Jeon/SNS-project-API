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
  online: Boolean,
});

const User = mongoose.model('user', userSchema);

const validateUser = (userInformation) => {
  const { id, pw, userName, birth, location, email, profile } = userInformation;

  if (!id || !pw || !userName || !birth || !location || !email || !profile) {
    return false;
  }

  return true;
};

exports.validateUser = validateUser;
exports.User = User;
