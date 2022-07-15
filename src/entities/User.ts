import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Account } from "./Account";
import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";
import { RefreshToken } from "./RefreshToken";
import { Role } from "./Role";

@Entity("users")
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "users_permissions",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
