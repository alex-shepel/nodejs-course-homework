const express = require('express');
const { contacts } = require('../../../controllers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await contacts.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    await contacts.getById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await contacts.add(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    await contacts.deleteById(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    await contacts.updateById(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
