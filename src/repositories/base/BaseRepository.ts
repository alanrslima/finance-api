import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  ObjectID
} from 'typeorm'

export interface BaseRepository<Entity> {
  // create: (
  //   entity: Entity & BaseEntity
  // ) => Promise<Entity & BaseEntity>
  // /**
  //  * Get an entity by ID
  //  * @param id
  //  */
  // read: (options: FindOneOptions<Entity & BaseEntity>) => Promise<Entity | null>
  // update: (entity: Entity & BaseEntity>) => Promise<Entity
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

  create: (entity: Entity) => Promise<Entity>

  readById: (id: any) => Promise<Entity | null>

  update: (entity: Entity) => Promise<Entity>

  delete: (
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<Entity>
  ) => Promise<DeleteResult>

  list: (options?: FindManyOptions<Entity>) => Promise<Entity[]>
}
