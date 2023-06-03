import { Between, In } from "typeorm";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { AccountRepository } from "../../../repositories/account/AccountRepository";
import { TransactionRepository } from "../../../repositories/transaction/TransactionRepository";
import { StatusCode } from "../../../types/StatusCode";
import { Errors } from "../../../lib/Errors";

export class GetTransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute(userId: string, params: any) {
    const { rows } = await this.accountRepository.list({
      where: { user: { id: userId } },
    });

    if (!rows.length) {
      throw new ErrorGenerator(StatusCode.Unauthorized, [
        Errors["resource.unauthorized"],
      ]);
    }

    const data = await this.transactionRepository.list({
      where: {
        ...(params?.startAt &&
          params?.endAt && {
            date: Between(new Date(params?.startAt), new Date(params?.endAt)),
          }),
        account: { id: In(rows.map((account) => account.id)) },
      },
    });
    return data;
  }
}
