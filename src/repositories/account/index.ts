import { Account } from "../../entities/Account";
import { BaseRepository } from "../base";
import { accountSchema } from "./index.validations";

export class AccountRepository extends BaseRepository<Account> {
  constructor() {
    super({
      entity: Account,
      filterable: ["id"],
      schema: accountSchema,
    });
  }
}
