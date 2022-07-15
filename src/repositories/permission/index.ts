import { Permission } from "../../entities/Permission";
import { BaseRepository } from "../base";
import { permissionSchema } from "./index.validations";

export class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super({
      entity: Permission,
      filterable: ["id"],
      schema: permissionSchema,
    });
  }
}
