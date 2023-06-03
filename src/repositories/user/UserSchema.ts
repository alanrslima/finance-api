import Joi from "joi";
import { baseSchema } from "../base/BaseSchema";
import joiMessages from "../../config/joi-messages.json";

export const userSchema = baseSchema
  .keys({
    firstName: Joi.string().min(3).allow(null),
    lastName: Joi.string().min(3).allow(null),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().allow(null),
    profile: Joi.string().allow(null),
    verifiedAt: Joi.date().allow(null),
  })
  .messages(joiMessages);
