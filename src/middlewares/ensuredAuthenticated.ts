import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'
import { ErrorGenerator } from '../lib/ErrorGenerator'
import { StatusCodes } from 'http-status-codes'

export function ensuredAuthenticated() {
  return (request: Request, _: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization

    if (authHeaders === null || authHeaders === undefined) {
      throw new ErrorGenerator('Token is missing', StatusCodes.BAD_REQUEST)
    }

    const [, token] = authHeaders.split(' ')

    try {
      verify(token, process.env.SECRET_JWT)
      const dec = decode(token)
      request.userId = String(dec?.sub)

      next()
      return
    } catch (err) {
      throw new ErrorGenerator('Unathorized', StatusCodes.UNAUTHORIZED)
    }
  }
}
