const bcrypt = require('bcrypt');

const { UnauthorizedError } = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');
const { User } = require('../models');
const { generateToken } = require('../utils');

const logIn = async (username, password) => {
  const user = await User.findOne({ username }).exec();

  if (user === null) {
    throw new UnauthorizedError(
      ERROR_CODES.INVALID_CREDENTIALS,
      'Username or password is incorrect',
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedError(
      ERROR_CODES.INVALID_CREDENTIALS,
      'Username or password is incorrect',
    );
  }

  const token = generateToken(user);

  return { user, token };
};

module.exports = {
  logIn,
};
