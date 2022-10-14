import { hash } from "bcryptjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/statusCode";

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const existUser = await this.userRepository.read({
      where: { email: user.email },
    });
    if (existUser) {
      throw new ErrorGenerator("User already exists", StatusCode.BadRequest);
    }
    const passwordHash = await hash(user.password, 8);
    return this.userRepository.create({ ...user, password: passwordHash });
  }
}
