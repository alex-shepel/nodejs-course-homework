const express = require('express');
const { users: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');
const { validation, auth, upload } = require('../../middlewares');

const router = express.Router();

router.post(
  '/register',
  validation(schemas.register),
  ctrlWrapper(ctrl.register),
);

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyMail));

router.post('/login', validation(schemas.login), ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.current));

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar),
);

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
