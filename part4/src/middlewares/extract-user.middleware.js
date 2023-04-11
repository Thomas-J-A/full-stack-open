const jwt = require('jsonwebtoken');

const env = require('../configs/env.config');
const { ERROR_CODES } = require('../data/constants');
const { UnauthorizedError } = require('../lib/errors');
const { User } = require('../models');

const extractUser = async (req, res, next) => {
  const { token } = req;

  try {
    const payload = jwt.verify(token, env.AUTH_TOKEN_SECRET);

    if (!payload.sub) {
      throw new UnauthorizedError(
        ERROR_CODES.AUTH_TOKEN_MISSING_CLAIM,
        'Auth token requires the sub claim',
      );
    }

    const user = await User.findById(payload.sub).exec();
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = extractUser;
