const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(code, message) {
    super(message);
    this.statusCode = 404;

    // NotFoundError could be thrown when username not found, password not found,
    // route not found etc, so this property distinguishes between them in a machine-readable way
    // Machine-readable version of message for clients to parse in conditionals
    this.code = code;
  }
}

module.exports = NotFoundError;

// {
//   name: 'NotFoundError',
//   statusCode: 404,
//   code: 'USER_NOT_FOUND',
//   message: 'No username was found matching Peter22'
//   stack: ...,
// }

// {
//   name: 'BadRequestError',
//   statusCode: 400,
//   code: 'FIELD_MISSING',
//   message: 'Username field is required',
//   stack: ...,
// }

// {
//   name: 'ConflictError',
//   statusCode: 409,
//   code: 'USERNAME_TAKEN',
//   message: 'Username <username> already exists',
//   stack: ...,
// }

// throw new ConflictError(`Username ${username} already exists`, USERNAME_TAKEN);
