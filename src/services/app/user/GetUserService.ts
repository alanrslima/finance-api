import { User } from "../../../entities/User";
import { UserRepository } from "../../../repositories/user/UserRepository";

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: { userId: string }): Promise<User[]> {
    const user = await this.userRepository.list({
      where: { id: userId },
    });
    return user;
  }
}
