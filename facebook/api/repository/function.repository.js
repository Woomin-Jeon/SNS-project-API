const funcRepo = {
  checkPassword(user, pw) {
    return user.pw === pw
  }
};

module.exports = funcRepo;
