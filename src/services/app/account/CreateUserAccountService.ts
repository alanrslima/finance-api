import { Account } from "../../../entities/Account";
import { AccountRepository } from "../../../repositories/account";
import { UserRepository } from "../../../repositories/user";

export class CreateUserAccountService {
  async execute({ account, userId }: { userId: string; account: Account }) {
    const accountRepo = new AccountRepository();
    const accountData = await accountRepo.create({
      ...account,
      user: { id: userId },
    });

    return accountData;
  }
}
