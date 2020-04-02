const validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req);
    if (error) {
      res.status(400).send({message: 'Validator error'});
      return;
    }
    next();
  };
};

module.exports = validate;
