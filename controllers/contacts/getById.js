const { getContactById } = require('../../models/contacts');
const { createError } = require('../../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) throw createError(404);
  res.json(contact);
};

module.exports = getById;
