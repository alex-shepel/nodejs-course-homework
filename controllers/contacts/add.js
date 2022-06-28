const { Contact } = require('../../models/contact');

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { _id: newContactId } = await Contact.create({ ...req.body, owner });
  const contact = await Contact.findById(newContactId).populate(
    'owner',
    'email',
  );
  res.status(201).json(contact);
};

module.exports = add;
