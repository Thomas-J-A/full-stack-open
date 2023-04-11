const AppError = require('./AppError');

class ForbiddenError extends AppError {
  constructor(code, message) {
    super(message);
    this.statusCode = 403;
    this.code = code;
  }
}

module.exports = ForbiddenError;
