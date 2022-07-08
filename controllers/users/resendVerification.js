const { User } = require('../../models/user');
const { createError, sendMail } = require('../../helpers');
const { nanoid } = require('nanoid');
const { template } = require('../../shared');

const resendVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw createError(404, 'User not found');
  if (user.verify)
    throw createError(400, 'Verification has already been passed');

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { verificationToken: nanoid() },
    { new: true },
  );

  const mail = {
    to: email,
    subject: 'Email Verification',
    html: template.verificationLink(updatedUser.verificationToken),
  };
  await sendMail(mail);

  res.json({ message: 'Verification email sent' });
};

module.exports = resendVerification;
