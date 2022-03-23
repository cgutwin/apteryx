import Product from "../db/models/Product"
import knexInstance from "../db"
import { ProductInput } from "../graphql/types/generated"
import { NotFoundError } from "objection"

/**
 * Insert a new product as a transaction into the db.
 * @param product - The product to insert into the database.
 * @throws {Error} - Throws a db specific error.
 * @returns {Promise} - A promise that resolves to the product when successfully inserted.
 */
export async function create<TProduct>(product: TProduct) {
  // @ts-ignore
  return Product.transaction<Product>(knexInstance, async trx => {
    return Product.query(trx)
                  .insert(product)
                  .returning("id")
  })
}

/**
 * Query for a single product.
 * @param {string} upc - The upc of the product to query for.
 * @throws {NotFoundError} - Throws a db specific error.
 * @returns {Promise} - A promise containing the single product queried.
 */
export async function findByUPC(upc: ProductInput["upc"]) {
  // @ts-ignore
  const product = await Product.query(knexInstance)
                               .where("upc", upc)
                               .first()

  // Could use throwIfNotFound method, but it seems to create a recursive type error with typescript.
  // https://github.com/Vincit/objection.js/issues/2178
  // Manually check instead.
  if (product === undefined) throw new NotFoundError({
    message: `Product with UPC ${upc} not found`
  })

  return product
}

/**
 * Patches a product's data with new information.
 * @param upc - The upc of the product to patch.
 * @param data - The new product data.
 * @returns {Promise} - A promise containing the patched product.
 */
export async function patch<TProduct>(upc: ProductInput["upc"], data: TProduct) {
  // @ts-ignore
  return Product.transaction<Product>(knexInstance, async trx => {
    const productToPatch = await Product.query(trx)
                                        .where("upc", upc)
                                        .first()

    if (!productToPatch) {
      throw new NotFoundError({
        message: `Product with UPC ${upc} not found`
      })
    }

    return productToPatch
      .$query(trx)
      .patchAndFetch(data)
  })
}
