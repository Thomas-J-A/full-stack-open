const { logger } = require('../utils');

const logError = (err, req, res, next) => {
  logger.error('Error:', err.stack);

  next(err);
};

module.exports = logError;
