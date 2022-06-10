const { Schema, model } = require('mongoose');

const contactSchema = Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean,
});

const Contact = model('book', contactSchema);

module.exports = Contact;
