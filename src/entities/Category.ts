import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity("categories")
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    cascade: true,
  })
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}
