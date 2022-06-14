const { Schema, model } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: {
      type: String,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
