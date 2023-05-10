import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
} from "typeorm";

export interface BaseRepository<Entity> {
  create(entity: DeepPartial<Entity>): Promise<Entity>;

  /**
   * Get an entity by ID
   * @param id
   */
  read(id: string | number): Promise<Entity>;

  update(entity: DeepPartial<Entity>): Promise<Entity>;

  // list(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;

  list(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;
  list(conditions?: FindConditions<Entity>): Promise<[Entity[], number]>;

  /**
   * Make a logic deletion on database
   * @param id
   */
  delete(id: string | number): Promise<boolean>;

  /**
   * Make a physical deletion on database
   * @param id
   */
  remove(id: string | number): Promise<DeleteResult>;
}
