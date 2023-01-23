import { InMemoryBaseRepository } from '../base/InMemoryBaseRepository'
import { PermissionRepository } from './PermissionRepository'
import { Permission } from '../../entities/Permission'
import { permissionSchema } from './PermissionSchema'

export class InMemoryPermissionRepository
  extends InMemoryBaseRepository<Permission>
  implements PermissionRepository {
  constructor() {
    super({ schema: permissionSchema })
  }
}
