const { createError } = require('../../helpers');
const updateStatusContact = require('./updateStatusContact');

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateStatusContact(contactId, req.body);
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = updateFavoriteById;
