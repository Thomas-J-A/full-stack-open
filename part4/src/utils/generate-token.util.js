const jwt = require('jsonwebtoken');

const env = require('../configs/env.config');

const generateToken = (user) => jwt.sign(
  { sub: user._id },
  env.ACCESS_TOKEN_SECRET,
  { expiresIn: 60 * 15 },
);

module.exports = generateToken;
