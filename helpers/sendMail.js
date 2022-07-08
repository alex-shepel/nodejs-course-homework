const sg = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_KEY, SENDER_MAIL } = process.env;
sg.setApiKey(SENDGRID_KEY);

const sendMail = async data => {
  try {
    await sg.send({ ...data, from: SENDER_MAIL });
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = sendMail;
