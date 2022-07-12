import { hash } from "bcryptjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user";

export class CreateUserService {
  async execute(user: User): Promise<User> {
    const userRepo = new UserRepository();
    await userRepo.validator(user);

    const existUser = await userRepo.read({ username: user.username });
    if (existUser) {
      // TODO: Use error generator
      throw new Error("User already exists");
    }
    const passwordHash = await hash(user.password, 8);
    return userRepo.create({ ...user, password: passwordHash });
  }
}
