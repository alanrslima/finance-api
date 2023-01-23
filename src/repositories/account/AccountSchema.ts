import Joi from 'joi'
// import joiMessages from "../../config/joi-messages.json";

export const accountSchema = Joi.object({
  name: Joi.string().required(),
  openingBalance: Joi.number(),
  color: Joi.string(),
  user: Joi.object()
})
//   .messages(joiMessages);
