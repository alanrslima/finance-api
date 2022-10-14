import { Account } from "../../../entities/Account";
import { AccountRepository } from "../../../repositories/account/AccountRepository";

export class GetUserAccountsService {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ userId }: { userId: string }): Promise<Account[]> {
    // const accounts = await this.accountRepository.list({
    //   where: { user: { id: userId } },
    // });
    // return accounts;
    return [];
  }
}
