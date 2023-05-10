import { Transaction } from "../../../entities/Transaction";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { AccountRepository } from "../../../repositories/account/AccountRepository";
import { TransactionRepository } from "../../../repositories/transaction/TransactionRepository";
import { StatusCode } from "../../../types/statusCode";

export class CreateTransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute(userId: string, transaction: Transaction) {
    // 1. Veirificar se a conta é do usuário logado
    const [account] = await this.accountRepository.list({
      where: { user: { id: userId }, id: transaction.account.id },
    });

    if (!account.length) {
      throw new ErrorGenerator(
        "Conta inexistente ou sem acesso para o usuário logado",
        StatusCode.Unauthorized
      );
    }
    // 2. Verificar se a categoria é do usuário logado

    const data = await this.transactionRepository.create(transaction);
    return data;
  }
}
