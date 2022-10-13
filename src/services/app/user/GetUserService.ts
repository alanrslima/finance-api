import { User } from "../../../entities/User";
import { UserRepository } from "../../../repositories/user/UserRepository";

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(where: Partial<User>): Promise<User | undefined> {
    const user = await this.userRepository.read({ where });
    return user?.deletedAt ? undefined : user;
  }
}
