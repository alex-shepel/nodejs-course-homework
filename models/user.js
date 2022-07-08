const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { regexp } = require('../shared');

const SUBSCRIPTION_ENUM = ['starter', 'pro', 'business'];
const PASSWORD_LENGTH = 6;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minLength: PASSWORD_LENGTH,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: regexp.EMAIL,
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_ENUM,
      default: 'starter',
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const register = Joi.object({
  password: Joi.string().min(PASSWORD_LENGTH).required(),
  email: Joi.string().pattern(regexp.EMAIL).required(),
});

const login = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(regexp.EMAIL).required(),
});

const schemas = {
  register,
  login,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
