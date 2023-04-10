const Joi = require('joi');

const logInBody = Joi.object({
  username: Joi
    .string()
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'any.required': 'Username is required',
    }),
  password: Joi
    .string()
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
});

module.exports = {
  logIn: {
    body: logInBody,
  },
};
