import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
//   .messages(joiMessages);
