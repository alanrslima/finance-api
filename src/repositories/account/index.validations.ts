import Joi from "joi";
// import joiMessages from "../../config/joi-messages.json";

export const accountSchema = Joi.object({
  name: Joi.number().required(),
});
//   .messages(joiMessages);
