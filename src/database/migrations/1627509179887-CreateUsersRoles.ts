import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersRoles1627509179887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_roles',
        columns: [
          { name: 'roleId', type: 'varchar(36)' },
          { name: 'userId', type: 'varchar(36)' }
        ],
        foreignKeys: [
          {
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            name: 'fk_roles_users',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            name: 'fk_users_roles',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_roles')
  }
}
