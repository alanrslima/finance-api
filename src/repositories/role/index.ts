import { Role } from "../../entities/Role";
import { BaseRepository } from "../base";
import { roleSchema } from "./index.validations";

export class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super({ entity: Role, filterable: ["id"], schema: roleSchema });
  }
}
