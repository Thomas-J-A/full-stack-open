const AppError = require('./AppError');

class ConflictError extends AppError {
  constructor(code, message) {
    super(message);
    this.statusCode = 409;
    this.code = code;
  }
}

module.exports = ConflictError;
