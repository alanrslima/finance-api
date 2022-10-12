import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/statusCode";

export class EditUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, user: User): Promise<User> {
    const existUser = await this.userRepository.read({ id });
    if (!existUser) {
      throw new ErrorGenerator("User not exists", StatusCode.BadRequest);
    }
    return this.userRepository.update({ ...existUser, ...user });
  }
}
