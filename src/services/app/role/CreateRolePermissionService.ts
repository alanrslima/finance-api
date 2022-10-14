import { Role } from "../../../entities/Role";
import { PermissionRepository } from "../../../repositories/permission/PermissionRepository";
import { RoleRepository } from "../../../repositories/role/RoleRepository";

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

export class CreateRolePermissionService {
  constructor(
    private roleRepository: RoleRepository,
    private permissionRepository: PermissionRepository
  ) {}

  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const role = await this.roleRepository.read({ where: { id: roleId } });

    if (!role) {
      return new Error("Role does not exists!");
    }

    const permissionsExists = await this.permissionRepository.listByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await this.roleRepository.create(role);
    return role;
  }
}
