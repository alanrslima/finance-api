import { Role } from "../../../entities/Role";
import { PermissionRepository } from "../../../repositories/permission";
import { RoleRepository } from "../../../repositories/role";

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

export class CreateRolePermissionService {
  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const roleRepo = new RoleRepository();
    const role = await roleRepo.read(roleId);

    if (!role) {
      return new Error("Role does not exists!");
    }

    const permissionRepo = new PermissionRepository();
    const permissionsExists = await permissionRepo.listByIds(permissions);

    role.permissions = permissionsExists;

    await roleRepo.create(role);
    return role;
  }
}
