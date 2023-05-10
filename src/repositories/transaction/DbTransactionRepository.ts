import { TransactionRepository } from "./TransactionRepository";
import { DbBaseRepository } from "../base/DbBaseRepository";
import { transactionSchema } from "./TransactionSchema";
import { Transaction } from "../../entities/Transaction";

export class DbTransactionRepository
  extends DbBaseRepository<Transaction>
  implements TransactionRepository
{
  constructor() {
    super({ entity: Transaction, schema: transactionSchema });
  }
}
