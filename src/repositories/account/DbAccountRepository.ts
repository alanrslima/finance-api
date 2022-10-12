import { AccountRepository } from "./AccountRepository";
import { DbBaseRepository } from "../base/DbBaseRepository";
import { accountSchema } from "./AccountSchema";
import { Account } from "../../entities/Account";

export class DbAccountRepository
  extends DbBaseRepository<Account>
  implements AccountRepository
{
  constructor() {
    super({ entity: Account, filterable: ["id"], schema: accountSchema });
  }
}
