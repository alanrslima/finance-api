import { Transaction } from "../../../entities/Transaction";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { Errors } from "../../../lib/Errors";
import { AccountRepository } from "../../../repositories/account/AccountRepository";
import { TransactionRepository } from "../../../repositories/transaction/TransactionRepository";
import { StatusCode } from "../../../types/StatusCode";

export class CreateTransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute(userId: string, transaction: Transaction) {
    // 1. Veirificar se a conta é do usuário logado
    const { rows } = await this.accountRepository.list({
      where: { user: { id: userId }, id: transaction.account.id },
    });

    if (!rows.length) {
      throw new ErrorGenerator(StatusCode.Forbidden, [
        Errors["resource.unauthorized"],
      ]);
    }
    // 2. Verificar se a categoria é do usuário logado

    const data = await this.transactionRepository.create(transaction);
    return data;
  }
}
