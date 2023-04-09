const { BadRequestError } = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');

// property: [body, query, params, headers]
const validate = (schema, property) => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    stripUnknown: true,
  });

  if (error) {
    return next(new BadRequestError(
      ERROR_CODES.VALIDATION_FAILURE,
      error.details[0].message,
    ));
  }

  // Replace req[property] with sanitized/validated data
  req[property] = value;

  next();
};

module.exports = validate;
