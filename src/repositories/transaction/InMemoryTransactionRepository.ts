import { Transaction } from "../../entities/Transaction";
import { InMemoryBaseRepository } from "../base/InMemoryBaseRepository";
import { TransactionRepository } from "./TransactionRepository";
import { transactionSchema } from "./TransactionSchema";

export class InMemoryTransactionRepository
  extends InMemoryBaseRepository<Transaction>
  implements TransactionRepository
{
  constructor() {
    super({ schema: transactionSchema });
  }
}
