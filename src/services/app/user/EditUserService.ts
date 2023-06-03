import { User } from "../../../entities/User";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { StatusCode } from "../../../types/StatusCode";
import { GetUserService } from "./GetUserService";

export class EditUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    { firstName, lastName, phone, profile }: User
  ): Promise<User> {
    const getUserService = new GetUserService(this.userRepository);
    const existUser = await getUserService.execute({ id });
    if (!existUser) {
      throw new ErrorGenerator(StatusCode.BadRequest, []);
    }
    return this.userRepository.update({
      ...existUser,
      firstName,
      lastName,
      phone,
      profile,
    });
  }
}
