const Joi = require('joi');

const registerUserBody = Joi.object({
  username: Joi
    .string()
    .min(3)
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'string.min': 'Username must be at least 3 characters',
      'any.required': 'Username is required',
    }),
  name: Joi
    .string()
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name must not be empty',
      'any.required': 'Name is required',
    }),
  password: Joi
    .string()
    .min(3)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 3 characters',
      'any.required': 'Password is required',
    }),
});

module.exports = {
  registerUser: {
    body: registerUserBody,
  },
};
