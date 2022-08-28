import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermissionsRoles1627508996984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permissions_roles",
        columns: [
          { name: "roleId", type: "varchar(36)" },
          { name: "permissionId", type: "varchar(36)" },
        ],
        foreignKeys: [
          {
            columnNames: ["permissionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissions",
            name: "fk_permissions_roles",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            name: "fk_roles_permissions",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("permissions_roles");
  }
}
