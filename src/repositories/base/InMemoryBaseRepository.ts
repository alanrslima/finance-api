import {
  Brackets,
  DeepPartial,
  FindConditions,
  FindManyOptions,
  ObjectLiteral,
  FindOneOptions,
} from "typeorm";
import { BaseEntity } from "../../entities/BaseEntity";
import { BaseRepository } from "./BaseRepository";
import { v4 as uuid } from "uuid";
import { Validator } from "../../lib/Validator";
import Joi from "joi";

export class InMemoryBaseRepository<Entity> implements BaseRepository<Entity> {
  private items: Entity & BaseEntity[];
  private schema: Joi.ObjectSchema<any>;

  constructor({ schema }: { schema: any }) {
    this.items = [] as Entity & BaseEntity[];
    this.schema = schema;
  }

  async create(
    entity: DeepPartial<Entity>
  ): Promise<DeepPartial<Entity> & Entity> {
    await this.validator(entity);
    return new Promise((resolve, reject) => {
      const newItem = {
        ...entity,
        id: uuid(),
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
      };
      this.items.push(newItem);
      resolve(newItem as DeepPartial<Entity> & Entity);
    });
  }

  async read(conditions?, options?): Promise<Entity | undefined> {
    return new Promise((resolve, reject) => {
      if (typeof conditions === "object") {
        const item = this.items.find((item) => {
          const [key] = Object.keys(conditions.where);
          return item[key] === conditions.where[key];
        });
        resolve(item as Entity);
      } else {
        const item = this.items.find((item) => item.id === conditions);
        resolve(item as Entity);
      }
    });
  }

  async list(
    options?: FindManyOptions<Entity> | FindConditions<Entity>
  ): Promise<Entity[]> {
    return new Promise((resolve, reject) => {
      const t = [];
      resolve([t] as Entity[]);
    });
  }

  async listByIds(
    ids: any[],
    options?: FindManyOptions<Entity>
  ): Promise<Entity[]> {
    return new Promise((resolve, reject) => {
      const t = [];
      resolve([t] as Entity[]);
    });
  }

  async update(
    entity: DeepPartial<Entity>
  ): Promise<DeepPartial<Entity> & Entity> {
    await this.validator(entity);
    return new Promise((resolve, reject) => {
      const params = entity as Entity & BaseEntity;
      const newItems = this.items.map((item) =>
        item.id === params.id ? { ...item, ...params } : item
      ) as Entity & BaseEntity[];
      this.items = newItems;
      resolve(entity as DeepPartial<Entity> & Entity);
    });
  }

  async delete(
    where:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral
  ) {}

  async validator(entity: DeepPartial<Entity>) {
    const validator = new Validator(this.schema);
    await validator.validateAsyncFields(entity);
  }
}
