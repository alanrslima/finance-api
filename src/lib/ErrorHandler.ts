import { NextFunction, Request, Response } from "express";

export class ErrorHandler {
  async handle(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    // logger.error(err);
    // logger.error(err.stack);
    switch (err.name) {
      case "ErrorGenerator":
        return res.responser(err.statusCode, err.message);
      default:
        return res.responser(
          500,
          "Ops ocorreu um erro, tente novamente mais tarde."
        );
    }
  }
}
