const { User } = require('../../models/user');

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: '' });
  res.status(204).send();
};

module.exports = logout;
