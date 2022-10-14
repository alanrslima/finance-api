import { User } from "../../entities/User";
import { DbBaseRepository } from "../base/DbBaseRepository";
import { userSchema } from "./UserSchema";
import { UserRepository } from "./UserRepository";

export class DbUserRepository
  extends DbBaseRepository<User>
  implements UserRepository
{
  constructor() {
    super({ entity: User, schema: userSchema });
  }

  async readByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { email } });
  }
}
