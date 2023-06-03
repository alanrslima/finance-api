import { NextFunction, Response } from "express";

export const routeResponser = (
  _: any,
  response: Response,
  next: NextFunction
) => {
  response.responser = (
    status: number,
    message: string = "",
    data: any = {},
    errors: { cdErro: number; message: string }[],
    type: string = "json"
  ) => {
    // if (config.webserver.logs.active) {
    //   const urlsDontLog = ['/health', '/users/me'];

    // let Log = require(`../interfaces/${config.webserver.logs.interface}/classes/log`);
    // Log = new Log(req, status, msg, urlsDontLog);
    // Log.write();
    // }

    if (errors) {
      // console.error(message, error);
      // console.log("Error details:", error);
      return response.status(status).type(type).send({ errors });
    }

    return response.status(status).type(type).send({
      data,
      status,
      message,
    });
  };

  next();
};
