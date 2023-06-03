import { ErrorDetail } from "../types/ErrorDetail";
import { StatusCode } from "../types/StatusCode";

export class ErrorGenerator extends Error {
  detail: ErrorDetail[];
  statusCode: StatusCode;

  constructor(
    statusCode: StatusCode,
    detail: ErrorDetail[],
    name = "ErrorGenerator"
  ) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    // this.message = message;
    this.statusCode = statusCode;
    this.detail = detail;
    Error.captureStackTrace(this);
  }
}
