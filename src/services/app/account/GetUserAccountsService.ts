import { Account } from "../../../entities/Account";
import { AccountRepository } from "../../../repositories/account/AccountRepository";

export class GetUserAccountsService {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ userId }: { userId: string }) {
    const accounts = await this.accountRepository.list({
      take: 1,
      skip: 0,
      where: { user: { id: userId } },
    });
    return accounts;
  }
}
