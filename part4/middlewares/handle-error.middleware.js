const { AppError } = require('../utils/errors');
const { ERROR_CODES } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({
      statusCode: 400,
      code: ERROR_CODES.CASTING_FAILURE,
      message: 'Malformatted id',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      statusCode: 400,
      code: ERROR_CODES.VALIDATION_FAILURE,
      message: err.message,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
    });
  }

  // Any other types of errors get generic response
  res.status(500).json({
    statusCode: 500,
    code: ERROR_CODES.UNKNOWN_ERROR,
    message: 'Something went wrong',
  });
};

module.exports = handleError;

// const handleError = (err, req, res, next) => {
//   if (err.name === 'CastError') {
//     return res.status(400).json({ message: 'Malformatted id' });
//   }

//   if (err.name === 'ValidationError') {
//     return res.status(400).json({ message: err.message });
//   }

//   // Any other types of errors get generic response
//   res.status(500).json({ error: 'Something went wrong' });
// };

// module.exports = handleError;
