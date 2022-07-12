// const models = require("../models");
// const errors = require("../../../services/app/error");
// const { BaseValidator } = require("../../../services/app/validators");
// const { InvalidBody } = require("../../../services/app/error");
import joi from "joi";
import { getRepository, Repository, EntityTarget } from "typeorm";
import { Validator } from "../../lib/Validator";

// const { Op } = models.Sequelize;

// const validator = new BaseValidator();

export class BaseRepository<Entity> {
  private repository: Repository<Entity>;
  private filterable: string[];
  private schema: joi.ObjectSchema<any>;

  constructor({
    repository,
    filterable,
    schema,
  }: {
    repository: EntityTarget<Entity>;
    filterable: string[];
    schema: any;
  }) {
    this.repository = getRepository(repository);
    this.schema = schema;
  }

  async create(entity: Entity) {
    const obj = this.repository.create(entity);
    return this.repository.save(obj);
  }

  async read(filters: Partial<Entity>) {
    return this.repository.findOne(filters);
  }

  async update() {}

  async list() {}

  async validator(entity: Entity) {
    const validator = new Validator(this.schema);
    await validator.validateAsyncFields(entity);
  }
}
