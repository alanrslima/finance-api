import joi from 'joi'
import {
  Repository,
  EntityTarget,
  DeepPartial,
  DataSource,
  FindOptionsWhere,
  ObjectID,
  DeleteResult,
  FindManyOptions
} from 'typeorm'
import { MysqlDataSource } from '../../database/data-source'
import { BaseEntity } from '../../entities/BaseEntity'
import { Validator } from '../../lib/Validator'
import { BaseRepository } from './BaseRepository'

export class DbBaseRepository<Entity extends BaseEntity>
  implements BaseRepository<Entity>
{
  public repository: Repository<Entity>
  private readonly schema: joi.ObjectSchema<any>
  private readonly entity: EntityTarget<Entity>
  private readonly datasource: DataSource

  constructor({
    entity,
    schema
  }: {
    entity: EntityTarget<Entity>
    schema: any
  }) {
    this.repository = MysqlDataSource.getRepository(entity)
    this.schema = schema
    this.entity = entity
    this.datasource = MysqlDataSource
  }

  async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<Entity & BaseEntity>
  ): Promise<DeleteResult> {
    return await this.repository.delete(criteria)
  }

  async validator(entity: DeepPartial<Entity>): Promise<void> {
    const validator = new Validator(this.schema)
    await validator.validateAsyncFields(entity)
  }

  async create(entity: Entity): Promise<Entity> {
    await this.validator(entity)
    const obj = this.repository.create(entity)
    return await this.repository.save(obj, {})
  }

  async readById(id: any): Promise<Entity | null> {
    return await this.repository.findOneBy({ id })
  }

  async update(entity: Entity): Promise<Entity> {
    await this.validator(entity)
    return await this.repository.save(entity)
  }

  async list(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.repository.find(options)
  }
}
