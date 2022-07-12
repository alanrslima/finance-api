import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const refreshTokenSchema = Joi.object({
  expiresIn: Joi.number().required(),
  userId: Joi.string().required(),
});
//   .messages(joiMessages);
