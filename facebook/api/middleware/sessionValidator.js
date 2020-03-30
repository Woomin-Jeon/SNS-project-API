const sessionValidator = (req) => {
  return req.session.userID ? true : false;
};

module.exports = sessionValidator;
