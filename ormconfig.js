const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  type: "mysql",
  driver: {},
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
    entitiesDir: "src/entity",
  },
};
