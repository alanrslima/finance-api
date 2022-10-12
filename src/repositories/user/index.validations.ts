import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string(),
});
