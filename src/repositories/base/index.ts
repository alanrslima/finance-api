// const models = require("../models");
// const errors = require("../../../services/app/error");
// const { BaseValidator } = require("../../../services/app/validators");
// const { InvalidBody } = require("../../../services/app/error");
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

// const { Op } = models.Sequelize;

// const validator = new BaseValidator();

export class BaseRepository<Entity> {
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
    const obj = this.repository.create(entity);
    const result = await this.repository.save(obj);
    return result;
  }

  async read(
    options:
      | FindOneOptions<Entity>
      | FindConditions<Entity>
      | string
      | number
      | Date
      | ObjectID
  ) {
    return this.repository.findOne(options);
  }

  async list() {
    return this.repository.find();
  }

  async listByIds(ids: any[], options?: FindManyOptions<Entity>) {
    return this.repository.findByIds(ids, options);
  }

  async update() {}

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

  private async validator(entity: Entity) {
    const validator = new Validator(this.schema);
    await validator.validateAsyncFields(entity);
  }
}
