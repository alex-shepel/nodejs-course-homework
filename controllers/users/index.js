const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const updateAvatar = require('./updateAvatar');
const verifyMail = require('./verifyMail');

module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar,
  verifyMail,
};
