import { ExpiryInput } from "../graphql/types/generated"
import knexInstance from "../db"
import { NotFoundError } from "objection"
import Expiry from "../db/models/Expiry"

/**
 * Query for a single expiry.
 * @param {string} upc - The upc of the product to query for.
 * @throws {NotFoundError} - Throws a db specific error.
 * @returns {Promise} - A promise containing the single product queried.
 */
export async function findByUPC(upc: ExpiryInput["upc"]) {
  const expiry = await Expiry.query(knexInstance)
                             .where("upc", upc)

  // Could use throwIfNotFound method, but it seems to create a recursive type error with typescript.
  // https://github.com/Vincit/objection.js/issues/2178
  // Manually check instead.
  if (expiry === undefined) throw new NotFoundError({
    message: `Product with UPC ${upc} not found`
  })

  return expiry
}

export async function create<TExpiry>(expiry: TExpiry) {
  return Expiry.transaction<Expiry>(knexInstance, async trx => {
    return Expiry.query(trx)
                 .insert(expiry)
                 .returning("id")
  })
}

export async function remove<TData>(data: TData) {
  return Expiry.transaction<number>(knexInstance, async trx => {
    return Expiry.query(trx)
                 .delete()
                 .where(data)
  })
}
