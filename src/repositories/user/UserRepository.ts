import { User } from "../../entities/User";
import { BaseRepository } from "../base/BaseRepository";

export interface UserRepository extends BaseRepository<User> {
  readByEmail(email: string): Promise<User | undefined>;
}
