const express = require('express');
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');
const { validation } = require('../../middlewares');

const router = express.Router();

router.post(
  '/register',
  validation(schemas.register),
  ctrlWrapper(ctrl.register),
);

router.post('/login', validation(schemas.login), ctrlWrapper(ctrl.login));

module.exports = router;
