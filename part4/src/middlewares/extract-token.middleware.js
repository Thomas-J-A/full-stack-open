const { UnauthorizedError } = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');

const extractToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    req.token = token;

    next();
  } else {
    next(new UnauthorizedError(
      ERROR_CODES.MISSING_AUTH_TOKEN,
      'Auth header must be set',
    ));
  }
};

module.exports = extractToken;
