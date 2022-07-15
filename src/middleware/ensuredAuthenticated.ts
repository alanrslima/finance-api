import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { ErrorGenerator } from "../lib/ErrorGenerator";
import { StatusCode } from "../types/statusCode";

export const ensuredAuthenticated = () => {
  return async (request: Request, _: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      throw new ErrorGenerator("Token is missing", StatusCode.BadRequest);
    }

    const [, token] = authHeaders.split(" ");

    try {
      verify(token, process.env.SECRET_JWT);
      const { sub } = decode(token);
      request.userId = sub.toString();

      return next();
    } catch (err) {
      throw new ErrorGenerator("Unathorized", StatusCode.Unauthorized);
    }
  };
};
