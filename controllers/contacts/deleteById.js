const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw createError(404);
  }
  res.json({ message: 'contact deleted' });
};

module.exports = deleteById;
