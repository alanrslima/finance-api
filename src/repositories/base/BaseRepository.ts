import { DeepPartial, FindOneOptions } from 'typeorm'
import { BaseEntity } from '../../entities/BaseEntity'

export interface BaseRepository<Entity> {
  // create: (
  //   entity: DeepPartial<Entity & BaseEntity>
  // ) => Promise<DeepPartial<Entity & BaseEntity>>
  // /**
  //  * Get an entity by ID
  //  * @param id
  //  */
  // read: (options: FindOneOptions<Entity & BaseEntity>) => Promise<Entity | null>
  // update: (entity: DeepPartial<Entity & BaseEntity>) => Promise<Entity>
  // /**
  //  * Make a logic deletion on database
  //  * @param id
  //  */
  // delete: (options: FindOneOptions<Entity & BaseEntity>) => Promise<boolean>
  // /**
  //  * Make a physical deletion on database
  //  * @param id
  //  */
  // // remove: (id: string | number) => Promise<DeleteResult>

  // create: (entity: DeepPartial<Entity & BaseEntity>) => Promise<Entity>

  read: (id: string) => Promise<Entity | null>

  update: (entity: DeepPartial<Entity & BaseEntity>) => Promise<any>

  create: <T extends DeepPartial<Entity & BaseEntity>>(entity: T) => Promise<T>

  // delete: (id: string) => Promise<any>
}
