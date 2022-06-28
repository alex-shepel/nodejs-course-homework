const { Contact } = require('../../models/contact');

const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, {
    projection: '-createdAt -updatedAt',
    new: true,
  }).populate('owner', 'email');

module.exports = updateStatusContact;
