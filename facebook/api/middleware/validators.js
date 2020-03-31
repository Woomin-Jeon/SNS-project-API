const validator ={
  sessionValidator(req) {
    return req.session.userID ? true : false;
  },

};

module.exports = validator;
