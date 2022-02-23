// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      database: "postgres",
      user: "postgres",
      password: "password",
      port: 5430
    },
    debug: true,
    migrations: {
      directory: "./data/migrations"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    },
    migrations: {
      directory: "./data/migrations"
    }
  }
}
