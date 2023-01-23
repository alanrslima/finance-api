import joi from 'joi'
import {
  getRepository,
  Repository,
  EntityTarget,
  DeepPartial,
  FindOneOptions
} from 'typeorm'
import { BaseEntity } from '../../entities/BaseEntity'
import { Validator } from '../../lib/Validator'
import { BaseRepository } from './BaseRepository'

export class DbBaseRepository<Entity> implements BaseRepository<Entity> {
  public repository: Repository<Entity & BaseEntity>
  private readonly schema: joi.ObjectSchema<any>
  private readonly entity: EntityTarget<Entity>

  constructor({
    entity,
    schema
  }: {
    entity: EntityTarget<Entity & BaseEntity>
    schema: any
  }) {
    this.repository = getRepository(entity)
    this.schema = schema
    this.entity = entity
  }

  async validator(entity: DeepPartial<Entity & BaseEntity>): Promise<void> {
    const validator = new Validator(this.schema)
    await validator.validateAsyncFields(entity)
  }

  async create(
    entity: DeepPartial<Entity & BaseEntity>
  ): Promise<DeepPartial<Entity & BaseEntity>> {
    await this.validator(entity)
    const obj = this.repository.create(entity)
    const result = await this.repository.save(
      obj as DeepPartial<Entity & BaseEntity>
    )
    return result
  }

  async read(
    options: FindOneOptions<Entity & BaseEntity>
  ): Promise<Entity | null> {
    return await this.repository.findOne(options)
  }

  async update(
    entity: DeepPartial<Entity & BaseEntity>
  ): Promise<Entity & BaseEntity> {
    await this.validator(entity)
    return await this.repository.save(entity)
  }

  async delete(options: FindOneOptions<Entity & BaseEntity>): Promise<boolean> {
    const entity = (await this.read(options)) as DeepPartial<
      Entity & BaseEntity
    >
    if (entity !== null) {
      await this.update({ ...entity, deletedAt: new Date() })
      return true
    }
    return false
  }

  // async remove(id: string | number) {
  //   return await this.repository
  //     .createQueryBuilder()
  //     .delete()
  //     .from(this.entity)
  //     .where('id = :id', { id })
  //     .execute()
  // }
}
