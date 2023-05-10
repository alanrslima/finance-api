import joi from "joi";
import {
  getRepository,
  Repository,
  EntityTarget,
  DeepPartial,
  FindManyOptions,
  FindConditions,
} from "typeorm";
import { BaseEntity } from "../../entities/BaseEntity";
import { Validator } from "../../lib/Validator";
import { BaseRepository } from "./BaseRepository";

export class DbBaseRepository<Entity> implements BaseRepository<Entity> {
  public repository: Repository<Entity & BaseEntity>;
  private schema: joi.ObjectSchema<any>;
  private entity: EntityTarget<Entity>;

  constructor({
    entity,
    schema,
  }: {
    entity: EntityTarget<Entity & BaseEntity>;
    schema: any;
  }) {
    this.repository = getRepository(entity);
    this.schema = schema;
    this.entity = entity;
  }

  async validator(entity: DeepPartial<Entity & BaseEntity>) {
    const validator = new Validator(this.schema);
    await validator.validateAsyncFields(entity);
  }

  async create(
    entity: DeepPartial<Entity & BaseEntity>
  ): Promise<Entity & BaseEntity> {
    await this.validator(entity);
    const obj = this.repository.create(entity);
    const result = await this.repository.save(
      obj as DeepPartial<Entity & BaseEntity>
    );
    return result;
  }

  async read(id: string | number): Promise<(Entity & BaseEntity) | undefined> {
    return this.repository.findOne(id);
  }

  async update(
    entity: DeepPartial<Entity & BaseEntity>
  ): Promise<Entity & BaseEntity> {
    await this.validator(entity);
    return this.repository.save(entity);
  }

  async delete(id: string | number): Promise<boolean> {
    const entity = (await this.read(id)) as DeepPartial<Entity & BaseEntity>;
    if (entity) {
      await this.update({ ...entity, deletedAt: new Date() });
      return true;
    }
    return false;
  }

  list(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;
  list(conditions?: FindConditions<Entity>): Promise<[Entity[], number]>;
  list(conditions?: unknown): Promise<[Entity[], number]> {
    return this.repository.findAndCount(conditions);
  }

  async remove(id: string | number) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where("id = :id", { id })
      .execute();
  }
}
