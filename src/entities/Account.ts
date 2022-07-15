import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("accounts")
export class Account extends BaseEntity {
  @Column()
  name: string;

  @Column()
  openingBalance: number;

  @Column()
  color: string;

  @Column()
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
