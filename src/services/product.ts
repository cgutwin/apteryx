import Product from "../db/models/Product"
import knexInstance from "../db/index"

/**
 * Insert a new product as a transaction into the db.
 * @param product - The product to insert into the database.
 * @throws {Error} - Throws a db specific error.
 * @returns {Promise} - A promise that resolves to the product when successfully inserted.
 */
export async function create<TProduct>(product: TProduct) {
  return Product.transaction<Product>(knexInstance, async trx => {
    return Product.query(trx)
                  .insert(product)
                  .returning("id")
  })
}
