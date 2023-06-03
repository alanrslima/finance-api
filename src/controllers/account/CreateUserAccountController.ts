import { Request, Response } from "express";
import { DbAccountRepository } from "../../repositories/account/DbAccountRepository";
import { CreateUserAccountService } from "../../services/app/account/CreateUserAccountService";
import { StatusCode } from "../../types/StatusCode";

export class CreateUserAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const accountRepository = new DbAccountRepository();
    const createUserAccountService = new CreateUserAccountService(
      accountRepository
    );
    const product = await createUserAccountService.execute({
      account: request.body,
      userId,
    });
    return response.responser(
      StatusCode.Created,
      "Account created success",
      product
    );
  }
}
