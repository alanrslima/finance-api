import joi from "joi";
import {
  getRepository,
  Repository,
  EntityTarget,
  FindOneOptions,
  Brackets,
  ObjectLiteral,
  DeepPartial,
  FindConditions,
  ObjectID,
  FindManyOptions,
} from "typeorm";
import { Validator } from "../../lib/Validator";
import { BaseRepository } from "./BaseRepository";

export class DbBaseRepository<Entity> implements BaseRepository<Entity> {
  private repository: Repository<Entity>;
  private entity: EntityTarget<Entity>;
  private filterable: string[];
  private schema: joi.ObjectSchema<any>;

  constructor({
    entity,
    filterable,
    schema,
  }: {
    entity: EntityTarget<Entity>;
    filterable: string[];
    schema: any;
  }) {
    this.repository = getRepository(entity);
    (this.entity = entity), (this.schema = schema);
  }

  async create(entity: DeepPartial<Entity>) {
    await this.validator(entity);
    const obj = this.repository.create(entity);
    const result = await this.repository.save(obj as DeepPartial<Entity>);
    return result;
  }

  async read(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>
  );
  async read(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;
  async read(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>
  ): Promise<Entity | undefined>;

  async read(id?, options?): Promise<Entity | undefined> {
    return this.repository.findOne(id, options);
  }

  async list(options?: FindManyOptions<Entity> | FindConditions<Entity>) {
    return this.repository.find(options);
  }

  async listByIds(ids: any[], options?: FindManyOptions<Entity>) {
    return this.repository.findByIds(ids, options);
  }

  async update(entity: DeepPartial<Entity>) {
    await this.validator(entity);
    return this.repository.save(entity);
  }

  async delete(
    where:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral
  ) {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where(where, parameters)
      .execute();
  }

  async validator(entity: DeepPartial<Entity>) {
    const validator = new Validator(this.schema);
    await validator.validateAsyncFields(entity);
  }
}
