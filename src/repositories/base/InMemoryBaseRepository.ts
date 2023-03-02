import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  ObjectID
} from 'typeorm'
import { BaseEntity } from '../../entities/BaseEntity'
import { BaseRepository } from './BaseRepository'
import { v4 as uuid } from 'uuid'
import { Validator } from '../../lib/Validator'
import Joi from 'joi'

export class InMemoryBaseRepository<Entity extends BaseEntity>
  implements BaseRepository<Entity>
{
  public items: Entity[]
  private readonly schema: Joi.ObjectSchema<any>

  constructor({ schema }: { schema: any }) {
    this.items = []
    this.schema = schema
  }

  async validator(entity: DeepPartial<Entity>): Promise<void> {
    const validator = new Validator(this.schema)
    await validator.validateAsyncFields(entity)
  }

  async create(entity: Entity): Promise<Entity> {
    return await new Promise((resolve) => {
      const newItem = {
        ...entity,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      this.items.push(newItem)
      resolve(newItem)
    })
  }

  async readById(id: any): Promise<Entity | null> {
    return await new Promise((resolve) => {
      let item: DeepPartial<Entity> | null = null
      for (const element of this.items) {
        if (element.id === id) {
          item = element
          break
        }
      }
      resolve(item)
    })
  }

  async update(entity: Entity): Promise<Entity> {
    return await new Promise((resolve) => {
      this.items = this.items.map((item) =>
        item.id === entity.id ? entity : item
      )
      resolve(entity)
    })
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
      | FindOptionsWhere<Entity>
  ): Promise<DeleteResult> {
    return await new Promise((resolve) => {
      this.items = this.items.filter((item) => item.id !== criteria)
      const deleteResult: DeleteResult = { raw: null, affected: 1 }
      resolve(deleteResult)
    })
  }

  async list(options?: FindManyOptions<Entity> | undefined): Promise<Entity[]> {
    return await new Promise((resolve) => {
      const where = options?.where as FindOptionsWhere<Entity>
      this.items = this.items.filter((item) => item.id === where.id)
      resolve(this.items)
    })
  }
}
