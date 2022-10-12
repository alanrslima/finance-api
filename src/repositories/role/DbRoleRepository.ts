import { RoleRepository } from "./RoleRepository";
import { DbBaseRepository } from "../base/DbBaseRepository";
import { roleSchema } from "./RoleSchema";
import { Role } from "../../entities/Role";

export class DbRoleRepository
  extends DbBaseRepository<Role>
  implements RoleRepository
{
  constructor() {
    super({
      entity: Role,
      filterable: ["id"],
      schema: roleSchema,
    });
  }
}
