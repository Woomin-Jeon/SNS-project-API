const functions = {
  checkPassword(user, pw) {
    return user.pw === pw;
  }
};

module.exports = functions;
