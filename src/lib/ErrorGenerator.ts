import { StatusCodes } from 'http-status-codes'

export class ErrorGenerator extends Error {
  private readonly statusCode

  constructor(
    message: string,
    statusCode: StatusCodes,
    name = 'ErrorGenerator'
  ) {
    super()

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.message = message
    this.statusCode = statusCode
    Error.captureStackTrace(this)
  }
}
