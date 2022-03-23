import { DateQualifier, QueryExpiryByUpcArgs } from "../graphql/types/generated"
import knexInstance from "../db"
import { NotFoundError } from "objection"
import Expiry from "../db/models/Expiry"

interface FindByUPCArgs {
  upc: string,
  args: Pick<QueryExpiryByUpcArgs, "filter">
}


function parseOp(qualifier: DateQualifier, inclusive: boolean) {
  let operator: string = "="

  console.log(qualifier)

  switch (qualifier) {
    case "BEFORE":
      operator = "<"
      break
    case "AFTER":
      operator = ">"
      break
  }

  if (inclusive && operator !== "=") operator += "="

  console.log(operator)

  return operator
}

/**
 * Query for a single expiry.
 * @param {string} upc - The upc of the product to query for.
 * @throws {NotFoundError} - Throws a db specific error.
 * @returns {Promise} - A promise containing the single product queried.
 */
export async function findByUPC({ upc, args }: FindByUPCArgs) {
  // @ts-ignore
  const expiry = await Expiry.query(knexInstance)
                             .orderBy("date")
                             .where("upc", upc)
                             .modify((builder) => {
                               if (args.filter) {
                                 if (args.filter.length) {
                                   for (const filter of args.filter) {
                                     const op = parseOp(filter.qualifier!, filter.inclusive!)
                                     builder.where("date", op, filter.date.toISOString())
                                   }
                                 }
                               }
                             })

  // Could use throwIfNotFound method, but it seems to create a recursive type error with typescript.
  // https://github.com/Vincit/objection.js/issues/2178
  // Manually check instead.
  if (expiry === undefined) throw new NotFoundError({
    message: `Product with UPC ${upc} not found`
  })

  return expiry
}

export async function create<TExpiry>(expiry: TExpiry) {
  // @ts-ignore
  return Expiry.transaction<Expiry>(knexInstance, async trx => {
    return Expiry.query(trx)
                 .insert(expiry)
                 .returning("id")
  })
}

export async function remove<TData>(data: TData) {
  // @ts-ignore
  return Expiry.transaction<number>(knexInstance, async trx => {
    return Expiry.query(trx)
                 .delete()
                 .where(data)
  })
}
