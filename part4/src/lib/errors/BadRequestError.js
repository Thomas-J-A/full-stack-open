const AppError = require('./AppError');

class BadRequestError extends AppError {
  constructor(code, message) {
    super(message);
    this.statusCode = 400;
    this.code = code;
  }
}

module.exports = BadRequestError;
