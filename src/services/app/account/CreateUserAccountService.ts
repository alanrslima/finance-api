import { Account } from "../../../entities/Account";
import { AccountRepository } from "../../../repositories/account/AccountRepository";

export class CreateUserAccountService {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ account, userId }: { userId: string; account: Account }) {
    const accountData = await this.accountRepository.create({
      ...account,
      user: { id: userId },
    });

    return accountData;
  }
}
