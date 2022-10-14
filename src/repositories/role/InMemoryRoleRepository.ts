import { InMemoryBaseRepository } from "../base/InMemoryBaseRepository";
import { RoleRepository } from "./RoleRepository";
import { Role } from "../../entities/Role";
import { roleSchema } from "./RoleSchema";

export class InMemoryAccountRepository
  extends InMemoryBaseRepository<Role>
  implements RoleRepository
{
  constructor() {
    super({ schema: roleSchema });
  }
}
