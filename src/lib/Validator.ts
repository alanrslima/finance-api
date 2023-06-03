import Joi from "joi";
import { StatusCode } from "../types/StatusCode";
import { ErrorGenerator } from "./ErrorGenerator";

export class Validator {
  private schema: Joi.ObjectSchema<any>;

  constructor(schema: Joi.ObjectSchema<any>) {
    this.schema = schema;
  }

  async validateAsyncFields(entity: any) {
    try {
      // await this.schema.validateAsync(entity, { abortEarly: false });
      await this.schema.validateAsync(entity);
    } catch (error) {
      throw new ErrorGenerator(StatusCode.BadRequest, error.details);
    }
  }
}
