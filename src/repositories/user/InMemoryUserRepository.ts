import { User } from "../../entities/User";
import { InMemoryBaseRepository } from "../base/InMemoryBaseRepository";
import { UserRepository } from "./UserRepository";
import { userSchema } from "./UserSchema";

export class InMemoryUserRepository
  extends InMemoryBaseRepository<User>
  implements UserRepository
{
  constructor() {
    super({ schema: userSchema });
  }

  async readByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      const user = this.items.find((item) => item.email === email);
      resolve(user);
    });
  }
}
