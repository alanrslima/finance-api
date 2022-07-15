import { Request, Response } from "express";
import { GetUserAccountsService } from "../../services/app/account/GetUserAccountsService";
import { StatusCode } from "../../types/statusCode";

export class GetUserAccountsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const getUserAccountsService = new GetUserAccountsService();
    const accounts = await getUserAccountsService.execute({ userId });
    return response.responser(
      StatusCode.Success,
      "Accounts listed success",
      accounts
    );
  }
}
