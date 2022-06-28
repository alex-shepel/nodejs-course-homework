const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(
    contactId,
    '-createdAt -updatedAt',
  ).populate('owner', 'email');
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = getById;
