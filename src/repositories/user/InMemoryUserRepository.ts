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
}
