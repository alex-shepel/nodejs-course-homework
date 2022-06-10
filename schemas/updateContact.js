const Joi = require('joi');

const schemaUpdateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = schemaUpdateContact;
