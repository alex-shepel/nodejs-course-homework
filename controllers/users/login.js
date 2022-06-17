const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw createError(401, 'Wrong email');

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw createError(401, 'Wrong password');

  res.status(201).json({
    token: 'not.real.token',
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
