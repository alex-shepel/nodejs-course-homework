const jwt = require('jsonwebtoken');
const { createError } = require('../helpers');
const { SECRET_KEY } = process.env;
const { User } = require('../models/user');

/* TODO: refactor with jwt-passport package, it provides standard authorization solution */

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw createError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token === '') {
      throw createError(401);
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.message === 'Invalid signature') {
      err.status = 401;
    }
    next(err);
  }
};

module.exports = auth;
