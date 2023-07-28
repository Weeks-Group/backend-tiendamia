import * as dayjs from 'dayjs';
import * as Joi from 'joi';

export enum Status {
  Approve = 'Approve',
  Cancel = 'Cancel',
  Delivery = 'Delivery',
  Traveling = 'Traveling',
}

export const orderSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(Status))
    .required()
    .messages({
      'any.required': 'Check status to orden',
      'any.valid': 'wrong status',
    }),
  clientId: Joi.number().required().messages({
    'any.required': 'Check clientId',
  }),
  items: Joi.array().required().min(1).messages({
    'any.required': 'Check items',
    'any.min': 'min one item',
  }),
  shippingAddress: Joi.string().required().messages({
    'any.required': 'check address',
  }),
  shippingPromise: Joi.date().required().messages({
    'any.required': 'check shipping Promise',
    'any.type': 'wrong date',
  }),
});

export const dateValidation = Joi.object({
  initial: Joi.date().required().messages({
    'any.required': 'check initial date',
  }),
  last: Joi.date().required().messages({
    'any.required': 'check last date',
  }),
})
  .custom((value, helpers) => {
    if (value) {
      const validate = dayjs(value.initial).isSame(dayjs(value.last));
      if (!validate && dayjs(value.initial).isAfter(dayjs(value.last))) {
        return helpers.error('any.valid');
      }
    }
    return value;
  })
  .messages({
    'any.valid': 'Wrong Dates',
  });
