import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1683676004460 implements MigrationInterface {
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
            name: "notes",
            type: "varchar(256)",
            isNullable: true,
          },
          {
            name: "value",
            type: "float",
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "accountId",
            type: "varchar(36)",
          },
          {
            name: "categoryId",
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
            columnNames: ["accountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
            name: "fk_transactions_account",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            name: "fk_transactions_category",
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
