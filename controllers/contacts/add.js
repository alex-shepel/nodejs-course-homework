const { joiPostSchema } = require('../../routes/api/contacts/schemas');
const { createError } = require('../../helpers');
const { addContact } = require('../../models/contacts');

const add = async (req, res) => {
  const { error } = joiPostSchema.validate(req.body);
  if (error) throw createError(400, error.message);
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

module.exports = add;
