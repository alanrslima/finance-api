import Joi from 'joi'
import { baseSchema } from '../base/BaseSchema'
// import joiMessages from "../../config/joi-messages.json";

export const refreshTokenSchema = baseSchema.keys({
  expiresIn: Joi.number().required(),
  user: Joi.object()
  // userId: Joi.string().required(),
})
//   .messages(joiMessages);
