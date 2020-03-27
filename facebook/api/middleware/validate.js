module.exports = (validator) => {
  return (req, res, next) => {
    if (!validator(req.body)) {
      res.status(400).send({ message: 'validator error' });
      return;
    }
    next();
  };
};
