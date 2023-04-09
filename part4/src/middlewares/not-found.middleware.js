const { NotFoundError } = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');

const notFound = (req, res, next) => {
  next(new NotFoundError(
    ERROR_CODES.ROUTE_NOT_FOUND,
    `Path ${req.url} not found`,
  ));
};

module.exports = notFound;
