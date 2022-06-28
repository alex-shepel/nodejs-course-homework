const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const SALT_LENGTH = 10;

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw createError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, SALT_LENGTH);
  const user = await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
