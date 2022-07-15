import { hash } from "bcryptjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user";
import { StatusCode } from "../../../types/statusCode";

export class CreateUserService {
  async execute(user: User): Promise<User> {
    const userRepo = new UserRepository();
    const existUser = await userRepo.read({ username: user.username });
    if (existUser) {
      throw new ErrorGenerator("User already exists", StatusCode.BadRequest);
    }
    const passwordHash = await hash(user.password, 8);
    return userRepo.create({ ...user, password: passwordHash });
  }
}
