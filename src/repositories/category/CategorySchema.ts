import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
  user: Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .required(),
});
