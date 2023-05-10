import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1665847358662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            isPrimary: true,
            type: "varchar(36)",
          },
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
            name: "date",
            type: "timestamp",
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
            onUpdate: "now()",
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
            name: "fk_transactions_user",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
