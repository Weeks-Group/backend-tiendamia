import * as Joi from 'joi';

export const clientSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Check email',
    'string.email': 'Wrong email',
  }),
  name: Joi.string().required().messages({
    'any.required': 'Check name',
  }),
});
