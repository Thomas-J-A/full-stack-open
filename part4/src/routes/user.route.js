const express = require('express');

const { userController } = require('../controllers');
const { userValidation } = require('../validations');
const { validate } = require('../middlewares');

const router = express.Router();

router.get('/', userController.fetchUsers);

router.post(
  '/',
  validate(userValidation.registerUser.body, 'body'),
  userController.registerUser,
);

module.exports = router;
