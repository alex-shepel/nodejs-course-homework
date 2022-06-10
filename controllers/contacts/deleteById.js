const { removeContact } = require('../../models/contacts');
const { createError } = require('../../helpers');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) throw createError(404);
  res.json({ message: 'contact deleted' });
};

module.exports = deleteById;
