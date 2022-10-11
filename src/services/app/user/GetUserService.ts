import { User } from "../../../entities/User";
import { UserRepository } from "../../../repositories/user";

export class GetUserService {
  async execute({ userId }: { userId: string }): Promise<User[]> {
    const userRepo = new UserRepository();
    const user = await userRepo.list({
      where: { id: userId },
    });
    return user;
  }
}
