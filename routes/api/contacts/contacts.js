const express = require('express');
const { contacts: ctrl } = require('../../../controllers');
const { ctrlWrapper } = require('../../../helpers');
const { schemaAddContact, schemaUpdateContact } = require('../../../schemas');
const { validation } = require('../../../middlewares');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(schemaAddContact), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));

router.put(
  '/:contactId',
  validation(schemaUpdateContact),
  ctrlWrapper(ctrl.updateById),
);

module.exports = router;
