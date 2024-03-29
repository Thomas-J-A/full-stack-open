const ERROR_CODES = Object.freeze({
  AUTH_TOKEN_MISSING_CLAIM: 'AUTH_TOKEN_MISSING_CLAIM',
  CASTING_FAILURE: 'CASTING_FAILURE',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  MISSING_AUTH_TOKEN: 'MISSING_AUTH_TOKEN',
  NOT_AUTHORIZED: 'NOT_AUTHORIZED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  USERNAME_TAKEN: 'USERNAME_TAKEN',
  VALIDATION_FAILURE: 'VALIDATION_FAILURE',
});

module.exports = ERROR_CODES;

/*
  PASSWORDS_DONT_MATCH
*/
