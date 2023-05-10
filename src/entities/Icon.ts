import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity("accounts")
export class Icon extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: true,
  })
  transactions: Transaction[];
}
