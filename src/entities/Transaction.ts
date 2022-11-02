import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Account } from "./Account";
import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

@Entity("transactions")
export class Transaction extends BaseEntity {
  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  description: string;

  @Column()
  value: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn()
  category: Account;
}
