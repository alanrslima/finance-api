import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const permissionSchema = Joi.object({
  name: Joi.number().required(),
  description: Joi.string().required(),
});
//   .messages(joiMessages);
