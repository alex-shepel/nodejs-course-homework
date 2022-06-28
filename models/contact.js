const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');
const { regexp } = require('../shared');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: regexp.EMAIL,
    },
    phone: {
      type: String,
      match: regexp.PHONE,
    },
    favorite: {
      type: String,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const addContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexp.EMAIL),
  phone: Joi.string().pattern(regexp.PHONE),
  favorite: Joi.boolean(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(regexp.EMAIL),
  phone: Joi.string().pattern(regexp.PHONE),
  favorite: Joi.boolean(),
});

const updateFavoriteContact = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field "favorite"`,
  }),
});

const schemas = {
  addContact,
  updateContact,
  updateFavoriteContact,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
