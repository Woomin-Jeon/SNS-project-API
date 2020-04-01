const validate = {
  checker(validator) {
    return (req, res, next) => {
      if (!validator(req)) {
        res.status(400).send({message: 'Validator error'});
        return;
      }
      next();
    };
  }
};

module.exports = validate;
