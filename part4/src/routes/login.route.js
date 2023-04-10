const express = require('express');

const { loginController } = require('../controllers');
const { loginValidation } = require('../validations');
const { validate } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  validate(loginValidation.logIn.body, 'body'),
  loginController.logIn,
);

module.exports = router;
