import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const refreshTokenSchema = Joi.object({
  expiresIn: Joi.number().required(),
  user: Joi.object(),
  // userId: Joi.string().required(),
});
//   .messages(joiMessages);
