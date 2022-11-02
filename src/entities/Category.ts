import { Entity, Column, OneToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Transaction } from "./Transaction";

@Entity("categories")
export class Category extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    cascade: true,
  })
  transactions: Transaction[];
}
