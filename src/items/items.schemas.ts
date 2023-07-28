import * as Joi from 'joi';

export const itemSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Check title',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Check description',
  }),
  url: Joi.string().optional(),

  price: Joi.number().required().messages({
    'any.required': 'Check price item',
  }),

  quantity: Joi.number().required().messages({
    'any.required': 'Check quantity at item',
  }),
});
