import { Account } from "../../../entities/Account";
import { AccountRepository } from "../../../repositories/account";

export class GetUserAccountsService {
  async execute({ userId }: { userId: string }): Promise<Account[]> {
    const accountRepo = new AccountRepository();
    const accounts = await accountRepo.list({
      where: { user: { id: userId } },
    });
    return accounts;
  }
}
