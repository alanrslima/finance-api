import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshTokens1657467839193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          { name: "id", isPrimary: true, type: "varchar(36)" },
          {
            name: "expiresIn",
            type: "numeric",
          },
          {
            name: "userId",
            type: "varchar(36)",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_refresh_tokens_user",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("refresh_tokens");
  }
}
