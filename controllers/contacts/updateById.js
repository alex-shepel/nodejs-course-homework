const { createError } = require('../../helpers');
const { updateContact } = require('../../models/contacts');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) throw createError(404);
  res.json(contact);
};

module.exports = updateById;
