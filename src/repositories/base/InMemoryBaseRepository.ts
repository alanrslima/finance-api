import { DeepPartial, DeleteResult } from "typeorm";
import { BaseEntity } from "../../entities/BaseEntity";
import { BaseRepository } from "./BaseRepository";
import { v4 as uuid } from "uuid";
import { Validator } from "../../lib/Validator";
import Joi from "joi";

export class InMemoryBaseRepository<Entity> implements BaseRepository<Entity> {
  public items: Array<Entity & BaseEntity>;
  private schema: Joi.ObjectSchema<any>;

  constructor({ schema }: { schema: any }) {
    this.items = [];
    this.schema = schema;
  }

  async validator(entity: DeepPartial<Entity>) {
    const validator = new Validator(this.schema);
    await validator.validateAsyncFields(entity);
  }

  async create(
    entity: DeepPartial<Entity & BaseEntity>
  ): Promise<Entity & BaseEntity> {
    await this.validator(entity);
    return new Promise((resolve) => {
      const newItem = {
        ...entity,
        id: uuid(),
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
      } as Entity & BaseEntity;
      this.items.push(newItem);
      resolve(newItem);
    });
  }

  async read(id: string | number): Promise<Entity> {
    return new Promise((resolve) => {
      resolve(this.items.find((item) => item.id === id));
    });
  }

  async update(entity: DeepPartial<Entity & BaseEntity>): Promise<Entity> {
    await this.validator(entity);
    return new Promise(async (resolve, reject) => {
      const item = await this.read(entity.id);
      if (item) {
        const newItems = this.items.map((item) =>
          item.id === entity.id ? { ...entity, item } : item
        ) as Array<Entity & BaseEntity>;
        this.items = newItems;
        resolve(this.items.find((item) => item.id === entity.id));
      }
      reject();
    });
  }

  async delete(id: string | number): Promise<boolean> {
    return new Promise(async (resolve) => {
      const item = this.items.find((item) => item.id === id) as DeepPartial<
        Entity & BaseEntity
      >;
      if (item) {
        await this.update({ ...item, deletedAt: new Date() });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  async remove(id: string | number): Promise<DeleteResult> {
    return new Promise((resolve) => {
      this.items = this.items.filter((item) => item.id !== id);
      const result: DeleteResult = { raw: "", affected: 1 };
      resolve(result);
    });
  }
}
