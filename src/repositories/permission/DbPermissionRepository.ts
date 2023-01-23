import { PermissionRepository } from './PermissionRepository'
import { DbBaseRepository } from '../base/DbBaseRepository'
import { Permission } from '../../entities/Permission'
import { permissionSchema } from './PermissionSchema'

export class DbPermissionRepository
  extends DbBaseRepository<Permission>
  implements PermissionRepository {
  constructor() {
    super({ entity: Permission, schema: permissionSchema })
  }
}
