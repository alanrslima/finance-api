import { hash } from "bcryptjs";
import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/StatusCode";
import { Errors } from "../../../lib/Errors";

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const existUser = await this.userRepository.readByEmail(user.email);
    if (existUser) {
      throw new ErrorGenerator(StatusCode.BadRequest, [Errors["user.exists"]]);
    }
    let passwordHash;
    if (user.password) {
      passwordHash = await hash(user.password, 8);
    }
    const createdUser = await this.userRepository.create({
      ...user,
      password: passwordHash,
    });
    delete createdUser.password;
    return createdUser;
  }
}
