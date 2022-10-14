import { DeepPartial, DeleteResult } from "typeorm";

export interface BaseRepository<Entity> {
  create(entity: DeepPartial<Entity>): Promise<Entity>;

  /**
   * Get an entity by ID
   * @param id
   */
  read(id: string | number): Promise<Entity>;

  update(entity: DeepPartial<Entity>): Promise<Entity>;

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
