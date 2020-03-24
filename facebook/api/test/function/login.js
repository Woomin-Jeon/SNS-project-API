const User = require('../../models/user');

const login = {
  async passwordCheck(inputID, inputPW) {
    return (await User.findOne({ name: inputID})).pw === inputPW;
  }
};

module.exports = login;

