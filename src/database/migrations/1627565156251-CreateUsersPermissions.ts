import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersPermissions1627565156251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_permissions",
        columns: [
          { name: "permission_id", type: "varchar(36)" },
          { name: "user_id", type: "varchar(36)" },
        ],
        foreignKeys: [
          {
            columnNames: ["permission_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissions",
            name: "fk_permissions_user",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_users_permissions",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_permissions");
  }
}
