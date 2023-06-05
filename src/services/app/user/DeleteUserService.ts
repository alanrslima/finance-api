import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { Errors } from "../../../lib/Errors";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/StatusCode";

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new ErrorGenerator(StatusCode.BadRequest, [Errors["user.invalid"]]);
    }
    return deleted;
  }
}
