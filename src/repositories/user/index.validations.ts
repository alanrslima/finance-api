import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
//   .messages(joiMessages);
