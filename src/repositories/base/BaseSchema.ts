import Joi from 'joi'

export const baseSchema = Joi.object({
  id: Joi.string(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  deletedAt: Joi.date().allow(null)
})
