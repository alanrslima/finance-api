import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/statusCode";

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const existUser = await this.userRepository.read({ id });
    if (!existUser) {
      throw new ErrorGenerator("User not exists", StatusCode.BadRequest);
    }
    return this.userRepository.update({ ...existUser, deletedAt: new Date() });
  }
}
