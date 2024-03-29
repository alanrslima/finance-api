import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken extends BaseEntity {
  @Column()
  expiresIn: number;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}
