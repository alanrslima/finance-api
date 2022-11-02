import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Transaction } from "./Transaction";
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

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: true,
  })
  transactions: Transaction[];
}
