import { NextFunction, Request, Response } from 'express'

export class ErrorHandler {
  handle(err: any, req: Request, res: Response, next: NextFunction): any {
    // logger.error(err);
    // logger.error(err.stack);
    console.error(err)
    switch (err.name) {
      case 'ErrorGenerator':
        return res.responser(err.statusCode, err.message)
      default:
        return res.responser(
          500,
          'Ops ocorreu um erro, tente novamente mais tarde.'
        )
    }
  }
}
