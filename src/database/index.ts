// import { createConnection } from 'typeorm'
import { MysqlDataSource } from './data-source'

class Database {
  create(): void {
    MysqlDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!')
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })
    // createConnection()
    //   .then((res) => {
    //     console.log('DB Connect', res)
    //   })
    //   .catch((err) => {
    //     console.log('DB connection error', err)
    //   })
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
