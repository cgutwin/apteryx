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
      host: "postgres",
      database: "postgres",
      user: "postgres",
      password: "password",
    },
    migrations: {
      directory: "./data/migrations"
    }
  }
}
