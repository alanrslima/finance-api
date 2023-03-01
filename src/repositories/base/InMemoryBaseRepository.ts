import { DeepPartial, DeleteResult, FindOneOptions } from 'typeorm'
import { BaseEntity } from '../../entities/BaseEntity'
import { BaseRepository } from './BaseRepository'
import { v4 as uuid } from 'uuid'
import { Validator } from '../../lib/Validator'
import Joi from 'joi'

export class InMemoryBaseRepository<Entity> implements BaseRepository<Entity> {
  public items: Array<DeepPartial<Entity & BaseEntity>>
  private readonly schema: Joi.ObjectSchema<any>

  constructor({ schema }: { schema: any }) {
    this.items = []
    this.schema = schema
  }

  async validator(entity: DeepPartial<Entity>): Promise<void> {
    const validator = new Validator(this.schema)
    await validator.validateAsyncFields(entity)
  }

  // async create(
  //   entity: DeepPartial<Entity & BaseEntity>
  // ): Promise<DeepPartial<Entity & BaseEntity>> {
  //   await this.validator(entity)
  //   return await new Promise((resolve) => {
  //     const newItem: DeepPartial<Entity & BaseEntity> = {
  //       ...entity,
  //       id: uuid(),
  //       createdAt: new Date(),
  //       deletedAt: undefined,
  //       updatedAt: new Date()
  //     }
  //     this.items.push(newItem)
  //     resolve(newItem)
  //   })
  // }

  // async read(
  //   options: FindOneOptions<Entity & BaseEntity>
  // ): Promise<Entity | null> {
  //   return await new Promise((resolve) => {
  //     const response = this.items.find((item) => item.id === options.where)
  //     resolve(response as Entity | null)
  //   })
  // }

  // async update(entity: DeepPartial<Entity & BaseEntity>): Promise<Entity> {
  //   // await this.validator(entity)
  //   return await new Promise((resolve) => {
  //     // const response: Entity = {}
  //     // resolve(response)
  //     const item = this.read({ where: { id: '' } })
  //     if (item != null) {
  //       const newItems = this.items.map((item) =>
  //         item.id === entity.id ? { ...entity, item } : item
  //       ) as Array<Entity & BaseEntity>
  //       this.items = newItems
  //       resolve(this.items.find((item) => item.id === entity.id))
  //     }
  //     reject()
  //   })
  // }

  // async delete(options: FindOneOptions<Entity & BaseEntity>): Promise<boolean> {
  //   // return await new Promise(async (resolve) => {
  //   //   const item = this.items.find((item) => item.id === id) as DeepPartial<
  //   //     Entity & BaseEntity
  //   //   >
  //   //   if (item) {
  //   //     await this.update({ ...item, deletedAt: new Date() })
  //   //     resolve(true)
  //   //   } else {
  //   //     resolve(false)
  //   //   }
  //   // })
  //   return true
  // }

  // async remove(id: string | number): Promise<DeleteResult> {
  //   return await new Promise((resolve) => {
  //     this.items = this.items.filter((item) => item.id !== id)
  //     const result: DeleteResult = { raw: '', affected: 1 }
  //     resolve(result)
  //   })
  // }

  async create(entity: DeepPartial<Entity & BaseEntity>): Promise<Entity> {
    await this.validator(entity)
    return await new Promise((resolve) => {
      const newItem = {
        ...entity,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.items.push(newItem)
      resolve(newItem as Entity)
    })
  }
}
