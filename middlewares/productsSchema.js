const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '400|"name" is required',
    'string.min': '422|"name" length must be at least {#limit} characters long',
  }),
});

module.exports = { productSchema };
