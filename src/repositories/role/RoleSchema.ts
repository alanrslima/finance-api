import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const roleSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
//   .messages(joiMessages);
