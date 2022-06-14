const { Contact } = require('../../models/contact');

const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, {
    projection: '-createdAt -updatedAt',
    new: true,
  });

module.exports = updateStatusContact;
