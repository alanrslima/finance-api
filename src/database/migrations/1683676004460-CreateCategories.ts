import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1683676004460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          { name: "id", isPrimary: true, type: "varchar(36)" },
          {
            name: "name",
            type: "varchar(128)",
          },
          {
            name: "color",
            type: "varchar(36)",
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
            name: "fk_categories_user",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("categories");
  }
}
