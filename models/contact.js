const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');

const PHONE_REGEXP = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: PHONE_REGEXP,
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
  email: Joi.string(),
  phone: Joi.string().pattern(PHONE_REGEXP),
  favorite: Joi.boolean(),
});

const updateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().pattern(PHONE_REGEXP),
  favorite: Joi.boolean(),
});

const updateFavoriteContact = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field favorite`,
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
