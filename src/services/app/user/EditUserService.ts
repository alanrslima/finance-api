import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user";
import { StatusCode } from "../../../types/statusCode";

export class EditUserService {
  async execute(id: string, user: User): Promise<User> {
    const userRepo = new UserRepository();
    const existUser = await userRepo.read({ id });
    if (!existUser) {
      throw new ErrorGenerator("User not exists", StatusCode.BadRequest);
    }
    existUser.lastName = user.lastName;
    existUser.firstName = user.firstName;
    existUser.email = user.email;
    return userRepo.update(existUser);
  }
}
