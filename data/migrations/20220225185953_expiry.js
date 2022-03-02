/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("expiring", function(table) {
    table.uuid("id")
      // fn gen_random_uuid() exists in pg >= 13
      .defaultTo(knex.raw("gen_random_uuid()"))
      .primary()
    table.string("upc", 12)
    table.foreign("upc")
      .references("upc")
      .inTable("products")
    table.date("date")
      .notNullable()
    table.timestamp("createdAt", { useTz: false })
      .defaultTo(knex.fn.now())
    table.timestamp("updatedAt", { useTz: false })
      .defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable("expiring")
}
