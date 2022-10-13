import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/statusCode";
import { GetUserService } from "./GetUserService";

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const getUserService = new GetUserService(this.userRepository);
    const existUser = await getUserService.execute({ id });
    if (!existUser) {
      throw new ErrorGenerator("User not exists", StatusCode.BadRequest);
    }
    return this.userRepository.update({ ...existUser, deletedAt: new Date() });
  }
}
