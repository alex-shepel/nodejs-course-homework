const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createError(404);
  }
  next();
};

module.exports = isValidId;
