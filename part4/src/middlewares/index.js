const attachModelsMiddleware = require('./attach-models.middleware');
const extractTokenMiddleware = require('./extract-token.middleware');
const handleErrorMiddleware = require('./handle-error.middleware');
const logErrorMiddleware = require('./log-error.middleware');
const notFoundMiddleware = require('./not-found.middleware');
const validateMiddleware = require('./validate.middleware');

module.exports = {
  attachModels: attachModelsMiddleware,
  extractToken: extractTokenMiddleware,
  handleError: handleErrorMiddleware,
  logError: logErrorMiddleware,
  notFound: notFoundMiddleware,
  validate: validateMiddleware,
};
