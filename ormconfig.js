module.exports = {
  type: "mysql",
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "finance",
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
    entitiesDir: "src/entity",
  },
};
