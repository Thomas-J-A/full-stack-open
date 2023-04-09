const attachModelsMiddleware = require('./attach-models.middleware');
const handleErrorMiddleware = require('./handle-error.middleware');
const logErrorMiddleware = require('./log-error.middleware');
const notFoundMiddleware = require('./not-found.middleware');
const validateMiddleware = require('./validate.middleware');

module.exports = {
  attachModels: attachModelsMiddleware,
  handleError: handleErrorMiddleware,
  logError: logErrorMiddleware,
  notFound: notFoundMiddleware,
  validate: validateMiddleware,
};
