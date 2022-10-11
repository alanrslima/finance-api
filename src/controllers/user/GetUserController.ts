import { NextFunction, Request, Response } from "express";
import { GetUserService } from "../../services/app/user/GetUserService";
import { StatusCode } from "../../types/statusCode";

export class GetUserController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const getUserService = new GetUserService();
    const result = await getUserService.execute({ userId });
    return response.responser(StatusCode.Success, "User listed", result);
  }
}
