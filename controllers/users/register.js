const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models/user');
const { createError, sendMail } = require('../../helpers');
const { nanoid } = require('nanoid');
const { template } = require('../../shared');

const SALT_LENGTH = 10;

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw createError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, SALT_LENGTH);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Email Verification',
    html: template.verificationLink(user.verificationToken),
  };
  await sendMail(mail);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
