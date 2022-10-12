import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccount1657848100840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "accounts",
        columns: [
          { name: "id", isPrimary: true, type: "varchar(36)" },
          {
            name: "name",
            type: "varchar(128)",
          },
          {
            name: "openingBalance",
            type: "numeric",
            default: 0,
          },
          {
            name: "color",
            type: "varchar(36)",
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
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
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_accounts_user",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("accounts");
  }
}
