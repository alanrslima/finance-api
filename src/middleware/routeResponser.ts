import { NextFunction, Response } from "express";

export const routeResponser = (
  _: any,
  response: Response,
  next: NextFunction
) => {
  response.responser = (
    status,
    message = "",
    data = {},
    error = null,
    type = "json"
  ) => {
    // if (config.webserver.logs.active) {
    //   const urlsDontLog = ['/health', '/users/me'];

    // let Log = require(`../interfaces/${config.webserver.logs.interface}/classes/log`);
    // Log = new Log(req, status, msg, urlsDontLog);
    // Log.write();
    // }

    if (error) {
      // console.error(message, error);
      // console.log("Error details:", error);
    }

    return response.status(status).type(type).send({
      data,
      status,
      message,
    });
  };

  next();
};
