const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const userSchema = new Schema({
  id: String,
  pw: String,
  userName: String,
  birth: String,
  location: String,
  email: String,
  friends: Array,
  profile: String,
  online: Boolean,
});

const User = mongoose.model('user', userSchema);

const validateUser = (req) => {
  const schema = Joi.object({
    id: Joi.required(),
    pw: Joi.required(),
    userName: Joi.required(),
    birth: Joi.required(),
    location: Joi.required(),
    email: Joi.required(),
    profile: Joi.required(),
  });

  return Joi.validate(req.body, schema)
};

exports.validateUser = validateUser;
exports.User = User;
