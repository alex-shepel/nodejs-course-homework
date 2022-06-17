const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\S+@\S+\.\S+$/;
const subscriptionEnum = ['starter', 'pro', 'business'];

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: emailRegexp,
  },
  subscription: {
    type: String,
    enum: subscriptionEnum,
    default: 'starter',
  },
  token: String,
});

const register = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...subscriptionEnum),
});

const login = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const schemas = {
  register,
  login,
};

const Contact = model('user', userSchema);

module.exports = {
  Contact,
  schemas,
};
