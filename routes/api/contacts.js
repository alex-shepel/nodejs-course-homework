const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contact');
const { validation, isValidId, auth } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(schemas.addContact), ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(ctrl.deleteById));

router.put(
  '/:contactId',
  auth,
  isValidId,
  validation(schemas.updateContact),
  ctrlWrapper(ctrl.updateById),
);

router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validation(schemas.updateFavoriteContact),
  ctrlWrapper(ctrl.updateFavoriteById),
);

module.exports = router;
