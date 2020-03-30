module.exports = (validator) => {
  return (req, res, next) => {
    if (!validator(req)) {
      res.status(400).send({ message: 'validator error' });
      return;
    }
    next();
  };
};
