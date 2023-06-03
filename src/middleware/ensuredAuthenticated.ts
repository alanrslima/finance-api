import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { ErrorGenerator } from "../lib/ErrorGenerator";
import { StatusCode } from "../types/StatusCode";
import { Errors } from "../lib/Errors";

export const ensuredAuthenticated = () => {
  return async (request: Request, _: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      throw new ErrorGenerator(StatusCode.BadRequest, [
        Errors["token.missing"],
      ]);
    }

    const [, token] = authHeaders.split(" ");

    try {
      verify(token, process.env.SECRET_JWT);
      const { sub } = decode(token);
      request.userId = sub.toString();

      return next();
    } catch (err) {
      throw new ErrorGenerator(StatusCode.Unauthorized, [
        Errors["user.unauthorized"],
      ]);
    }
  };
};
