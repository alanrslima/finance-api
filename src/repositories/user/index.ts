import { User } from "../../entities/User";
import { BaseRepository } from "../base";
import { userSchema } from "./index.validations";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super({ repository: User, filterable: ["username"], schema: userSchema });
  }
}
