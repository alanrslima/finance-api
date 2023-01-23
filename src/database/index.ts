import { createConnection } from 'typeorm'

class Database {
  create(): void {
    createConnection()
      .then(() => {})
      .catch(() => {})
  }

  // close() {
  //   await getConnection().close()
  // }

  // async clear() {
  //   const connection = getConnection()
  //   const entities = connection.entityMetadatas

  //   entities.forEach(async (entity) => {
  //     const repository = connection.getRepository(entity.name)
  //     await repository.query(`DELETE FROM ${entity.tableName}`)
  //   })
  // }
}

export { Database }
