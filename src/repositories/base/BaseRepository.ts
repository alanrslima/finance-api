import {
  Brackets,
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  ObjectLiteral,
} from "typeorm";

export interface BaseRepository<Entity> {
  create(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity> & Entity>;

  // read(
  //   id?: string | number | Date | ObjectID,
  //   options?: FindOneOptions<Entity>
  // ): Promise<Entity | undefined>;
  read(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
  // read(
  //   conditions?: FindConditions<Entity>,
  //   options?: FindOneOptions<Entity>
  // ): Promise<Entity | undefined>;
  // read(id?, options?): Promise<Entity | undefined>;

  list(
    options?: FindManyOptions<Entity> | FindConditions<Entity>
  ): Promise<Entity[]>;

  listByIds(ids: any[], options?: FindManyOptions<Entity>): Promise<Entity[]>;

  update(entity: DeepPartial<Entity>): Promise<DeepPartial<Entity> & Entity>;

  delete(
    where:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral
  ): Promise<void>;

  validator(entity: DeepPartial<Entity>);
}
