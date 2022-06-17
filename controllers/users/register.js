const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const register = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw createError(409, 'Email in use');
  const user = await User.create(req.body);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
