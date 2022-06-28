const express = require('express');
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');
const { validation, auth } = require('../../middlewares');

const router = express.Router();

router.post(
  '/register',
  validation(schemas.register),
  ctrlWrapper(ctrl.register),
);

router.post('/login', validation(schemas.login), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
