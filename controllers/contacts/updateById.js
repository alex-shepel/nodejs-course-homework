const { joiPutSchema } = require('../../routes/api/contacts/schemas');
const { createError } = require('../../helpers');
const { updateContact } = require('../../models/contacts');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { error } = joiPutSchema.validate(req.body);
  if (error) throw createError(400, error.message);
  const contact = await updateContact(contactId, req.body);
  if (!contact) throw createError(404);
  res.json(contact);
};

module.exports = updateById;
