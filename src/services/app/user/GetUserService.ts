import { User } from "../../../entities/User";
import { UserRepository } from "../../../repositories/user/UserRepository";

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(params: {
    id?: string;
    email?: string;
  }): Promise<User | undefined> {
    if (params.id) {
      return await this.userRepository.read(params.id);
    }
    return await this.userRepository.readByEmail(params.email);
  }
}
