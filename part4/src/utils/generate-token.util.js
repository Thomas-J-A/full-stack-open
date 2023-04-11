const jwt = require('jsonwebtoken');

const env = require('../configs/env.config');

const generateToken = (user) => jwt.sign(
  { sub: user._id },
  env.AUTH_TOKEN_SECRET,
  { expiresIn: 60 * 60 },
);

module.exports = generateToken;
