import { PrimaryColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

export class BaseEntity {
  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  createdAt?: Date

  @CreateDateColumn()
  updatedAt?: Date

  @DeleteDateColumn({ nullable: true, default: null, select: false })
  deletedAt?: Date

  constructor() {
    if (this.id === undefined || this.id === null) {
      this.id = uuid()
    }
  }
}
