import { Request, Response } from "express";
import { DbAccountRepository } from "../../repositories/account/DbAccountRepository";
import { GetUserAccountsService } from "../../services/app/account/GetUserAccountsService";
import { StatusCode } from "../../types/statusCode";

export class GetUserAccountsController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const userRepository = new DbAccountRepository();
    const getUserAccountsService = new GetUserAccountsService(userRepository);
    const accounts = await getUserAccountsService.execute({ userId });
    return response.responser(
      StatusCode.Success,
      "Accounts listed success",
      accounts
    );
  }
}
