/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("products", function(table) {
    table.uuid("id")
      // fn gen_random_uuid() exists in pg >= 13
      .defaultTo(knex.raw("gen_random_uuid()"))
    table.string("upc", 12)
      .primary()
    table.float("price")
      .notNullable()
    table.string("name")
      .notNullable()
    table.timestamp("createdAt", { useTz: false })
      .defaultTo(knex.fn.now())
    table.timestamp("updatedAt", { useTz: false })
      .defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
};
