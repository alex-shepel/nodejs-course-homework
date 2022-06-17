const { Schema, model } = require('mongoose');
const Joi = require('joi');

const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
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
      match: EMAIL_REGEXP,
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_ENUM,
      default: 'starter',
    },
    token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const register = Joi.object({
  password: Joi.string().min(PASSWORD_LENGTH).required(),
  email: Joi.string().required(),
});

const login = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
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
