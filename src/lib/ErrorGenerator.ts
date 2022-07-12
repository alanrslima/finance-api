import { StatusCode } from "../types/statusCode";

export class ErrorGenerator extends Error {
  private statusCode;

  constructor(
    message: string,
    statusCode: StatusCode,
    name = "ErrorGenerator"
  ) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}
