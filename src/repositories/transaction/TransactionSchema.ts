import Joi from "joi";

export const transactionSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  description: Joi.string(),
  value: Joi.number().required(),
  account: Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .required(),
  category: Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .required(),
});
