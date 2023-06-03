import { Request, Response } from "express";
import { DbTransactionRepository } from "../../repositories/transaction/DbTransactionRepository";
import { GetTransactionService } from "../../services/app/transaction/GetTransactionService";
import { StatusCode } from "../../types/StatusCode";
import { DbAccountRepository } from "../../repositories/account/DbAccountRepository";

export class GetTransactionController {
  async handle(request: Request, response: Response) {
    const { userId } = request;

    const transactionRepository = new DbTransactionRepository();
    const accountRepository = new DbAccountRepository();
    const service = new GetTransactionService(
      transactionRepository,
      accountRepository
    );
    const transactions = await service.execute(userId, request.query);
    return response.responser(
      StatusCode.Success,
      "Transaction listed success",
      transactions
    );
  }
}
