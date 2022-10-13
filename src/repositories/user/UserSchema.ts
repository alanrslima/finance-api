import Joi from "joi";
import { baseSchema } from "../base/BaseSchema";

export const userSchema = baseSchema.keys({
  firstName: Joi.string().allow(null),
  lastName: Joi.string().allow(null),
  email: Joi.string().email().required(),
  password: Joi.string().min(8),
  phone: Joi.string().allow(null),
  profile: Joi.string().allow(null),
  verifiedAt: Joi.date().allow(null),
});
