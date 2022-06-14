const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    projection: '-createdAt -updatedAt',
    new: true,
  });
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = updateById;
