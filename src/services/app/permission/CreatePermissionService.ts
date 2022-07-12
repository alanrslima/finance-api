import { Permission } from "../../../entities/Permission";
import { PermissionRepository } from "../../../repositories";

type PermissionRequest = {
  name: string;
  description: string;
};

export class CreatePermissionService {
  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    const permissionRepo = PermissionRepository();

    if (await permissionRepo.findOne({ name })) {
      return new Error("Permission already exists");
    }

    const permission = permissionRepo.create({ name, description });
    await permissionRepo.save(permission);

    return permission;
  }
}
