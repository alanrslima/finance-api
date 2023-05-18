import Joi from "joi";

export const transactionSchema = Joi.object({
  date: Joi.string().isoDate().required(),
  notes: Joi.string(),
  name: Joi.string().required(),
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
