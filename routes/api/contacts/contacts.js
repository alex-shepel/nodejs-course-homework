const express = require('express');
const { contacts: ctrl } = require('../../../controllers');
const { ctrlWrapper } = require('../../../helpers');
const { schemas } = require('../../../models/contact');
const { validation, isValidId } = require('../../../middlewares');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validation(schemas.addContact), ctrlWrapper(ctrl.add));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteById));

router.put(
  '/:contactId',
  isValidId,
  validation(schemas.updateContact),
  ctrlWrapper(ctrl.updateById),
);

module.exports = router;
