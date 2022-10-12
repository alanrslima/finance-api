import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user";
import { StatusCode } from "../../../types/statusCode";

export class DeleteUserService {
  async execute(id: string) {
    const userRepo = new UserRepository();
    const existUser = await userRepo.read({ id });
    if (!existUser) {
      throw new ErrorGenerator("User not exists", StatusCode.BadRequest);
    }
    return userRepo.update({ ...existUser, deletedAt: new Date() });
  }
}
