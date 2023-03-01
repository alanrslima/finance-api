import joi from 'joi'
import { Repository, EntityTarget, DeepPartial, FindOneOptions } from 'typeorm'
import { MysqlDataSource } from '../../database/data-source'
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
    this.repository = MysqlDataSource.getRepository(entity)
    this.schema = schema
    this.entity = entity
  }

  // async validator(entity: DeepPartial<Entity & BaseEntity>): Promise<void> {
  //   const validator = new Validator(this.schema)
  //   await validator.validateAsyncFields(entity)
  // }

  // async create(
  //   entity: DeepPartial<Entity & BaseEntity>
  // ): Promise<DeepPartial<Entity & BaseEntity>> {
  //   await this.validator(entity)
  //   const obj = this.repository.create(entity)
  //   return await this.repository.save(obj as DeepPartial<Entity & BaseEntity>)
  // }

  // async read(
  //   options: FindOneOptions<Entity & BaseEntity>
  // ): Promise<Entity | null> {
  //   return await this.repository.findOne(options)
  // }

  // async update(
  //   entity: DeepPartial<Entity & BaseEntity>
  // ): Promise<Entity & BaseEntity> {
  //   await this.validator(entity)
  //   return await this.repository.save(entity)
  // }

  // async delete(options: FindOneOptions<Entity & BaseEntity>): Promise<boolean> {
  //   const entity = (await this.read(options)) as DeepPartial<
  //     Entity & BaseEntity
  //   >
  //   if (entity !== null) {
  //     await this.update({ ...entity, deletedAt: new Date() })
  //     return true
  //   }
  //   return false
  // }

  // async remove(id: string | number) {
  //   return await this.repository
  //     .createQueryBuilder()
  //     .delete()
  //     .from(this.entity)
  //     .where('id = :id', { id })
  //     .execute()
  // }

  async validator(entity: DeepPartial<Entity & BaseEntity>): Promise<void> {
    const validator = new Validator(this.schema)
    await validator.validateAsyncFields(entity)
  }

  // async create(entity: DeepPartial<Entity & BaseEntity>): Promise<Entity> {
  //   await this.validator(entity)
  //   const obj = this.repository.create(entity)
  //   return await this.repository.save(obj)
  // }
  async create<T extends DeepPartial<Entity & BaseEntity>>(
    entity: T
  ): Promise<T> {
    await this.validator(entity)
    const obj = this.repository.create(entity)
    return await this.repository.save(obj)
  }

  async read(id: any): Promise<any> {
    const options: FindOneOptions<Entity & BaseEntity> = { where: { id } }
    return await this.repository.findOne(options)
  }

  async update(entity: DeepPartial<Entity & BaseEntity>): Promise<any> {
    await this.validator(entity)
    return await this.repository.save(entity)
  }

  // delete: (id: string) => Promise<any>
}
