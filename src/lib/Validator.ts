import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ErrorGenerator } from './ErrorGenerator'

export class Validator {
  private readonly schema: Joi.ObjectSchema<any>

  constructor(schema: Joi.ObjectSchema<any>) {
    this.schema = schema
  }

  async validateAsyncFields(entity: any): Promise<void> {
    try {
      // await this.schema.validateAsync(entity, { abortEarly: false });
      await this.schema.validateAsync(entity)
    } catch (error: any) {
      throw new ErrorGenerator(error.message, StatusCodes.BAD_REQUEST)
    }
  }
}
