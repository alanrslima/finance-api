import { Permission } from "../../../entities/Permission";
import { ErrorGenerator } from "../../../lib/ErrorGenerator";
import { PermissionRepository } from "../../../repositories/permission";
import { StatusCode } from "../../../types/statusCode";

type PermissionRequest = {
  name: string;
  description: string;
};

export class CreatePermissionService {
  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    const permissionRepo = new PermissionRepository();

    if (await permissionRepo.read({ name })) {
      return new ErrorGenerator(
        "Permission already exists",
        StatusCode.BadRequest
      );
    }

    const permission = await permissionRepo.create({ name, description });
    return permission;
  }
}
