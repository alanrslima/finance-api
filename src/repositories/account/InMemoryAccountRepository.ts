import { Account } from "../../entities/Account";
import { InMemoryBaseRepository } from "../base/InMemoryBaseRepository";
import { AccountRepository } from "./AccountRepository";
import { accountSchema } from "./AccountSchema";

export class InMemoryAccountRepository
  extends InMemoryBaseRepository<Account>
  implements AccountRepository {}

export class InMemoryPermissionRepository extends InMemoryBaseRepository<Account> {
  constructor() {
    super({ schema: accountSchema });
  }
}
