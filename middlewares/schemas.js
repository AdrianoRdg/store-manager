const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '400|"name" is required',
    'string.min': '422|"name" length must be at least {#limit} characters long',
  }),
});

const addProductSchema = Joi.object({
  productId: Joi.number().integer().required()
    .messages({
      'any.required': '400|"productId" is required',
  }),
  quantity: Joi.number().integer().required().min(1)
    .messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to 1',
  }),
});

module.exports = { productSchema, addProductSchema };
