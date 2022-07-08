const { PORT } = process.env;

const verificationLink = token =>
  `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${token}">CLICK ON TO CONFIRM EMAIL</a>`;

module.exports = { verificationLink };
