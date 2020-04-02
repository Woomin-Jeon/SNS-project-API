const Joi = require('@hapi/joi');

const validateSession = (req) => {
  const schema = Joi.object({
    userID: Joi.required(),
  }).unknown();

  return Joi.validate(req.session, schema);
};

module.exports = validateSession;
