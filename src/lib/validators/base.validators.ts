import joi from "joi";

export class BaseValidator {
  private body;
  private schema;

  constructor(body = null, schema = null) {
    this.body = body;
    this.schema = schema;
  }

  setBody(body) {
    this.body = body;
  }

  getBody() {
    return this.body;
  }

  setSchema(schema) {
    this.schema = schema;
  }

  getSchema() {
    return this.schema;
  }

  // Validate fields;
  validateFields(body, schema) {
    try {
      const bodyToValidate = body ? body : this.getBody();
      const schemaToValidate = schema ? schema : this.getSchema();
      joi.assert(bodyToValidate, schemaToValidate);
      return false;
    } catch (errs) {
      const errors = [];
      console.error(errs);
      errs.details.forEach((error) => {
        errors.push({
          name: "InvalidBody",
          code: 400,
          message: error.message,
        });
      });
      throw errors;
    }
  }
}
