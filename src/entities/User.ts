import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Account } from "./Account";
import { BaseEntity } from "./BaseEntity";
import { RefreshToken } from "./RefreshToken";
import { Role } from "./Role";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "userId" }],
    inverseJoinColumns: [{ name: "roleId" }],
  })
  roles: Role[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
