const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(code, message) {
    super(message);
    this.statusCode = 401;
    this.code = code;
  }
}

module.exports = UnauthorizedError;
