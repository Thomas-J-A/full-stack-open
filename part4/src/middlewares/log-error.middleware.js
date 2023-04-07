const { logger } = require('../utils');

const logError = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.error('Error:', err.stack);
  }

  next(err);
};

module.exports = logError;
