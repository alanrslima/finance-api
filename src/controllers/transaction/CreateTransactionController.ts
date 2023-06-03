import { Request, Response } from "express";
import { DbTransactionRepository } from "../../repositories/transaction/DbTransactionRepository";
import { CreateTransactionService } from "../../services/app/transaction/CreateTransactionService";
import { StatusCode } from "../../types/StatusCode";
import { DbAccountRepository } from "../../repositories/account/DbAccountRepository";

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const transactionRepository = new DbTransactionRepository();
    const accountRepository = new DbAccountRepository();
    const service = new CreateTransactionService(
      transactionRepository,
      accountRepository
    );
    const product = await service.execute(userId, request.body);
    return response.responser(
      StatusCode.Created,
      "Transaction created success",
      product
    );
  }
}
