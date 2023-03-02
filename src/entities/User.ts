import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany
} from 'typeorm'
import { Account } from './Account'
import { BaseEntity } from './BaseEntity'
import { RefreshToken } from './RefreshToken'
import { Role } from './Role'

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string

  @Column({ nullable: true, select: false })
  password?: string

  @Column({ nullable: true })
  firstName?: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  profile?: string

  @CreateDateColumn({ nullable: true })
  verifiedAt?: Date

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId' }]
  })
  roles?: Role[]

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true
  })
  refreshTokens?: RefreshToken[]

  @OneToMany(() => Account, (account) => account.user, { cascade: true })
  accounts?: Account[]
}
