const attachModelsMiddleware = require('./attach-models.middleware');
const extractTokenMiddleware = require('./extract-token.middleware');
const extractUserMiddleware = require('./extract-user.middleware');
const handleErrorMiddleware = require('./handle-error.middleware');
const logErrorMiddleware = require('./log-error.middleware');
const handleNotFoundMiddleware = require('./handle-not-found.middleware');
const validateMiddleware = require('./validate.middleware');

module.exports = {
  attachModels: attachModelsMiddleware,
  extractToken: extractTokenMiddleware,
  extractUser: extractUserMiddleware,
  handleError: handleErrorMiddleware,
  logError: logErrorMiddleware,
  handleNotFound: handleNotFoundMiddleware,
  validate: validateMiddleware,
};
