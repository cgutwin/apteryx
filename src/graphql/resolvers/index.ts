import GraphQLUPCAType from "../scalars/upc"
import { DateResolver } from "graphql-scalars"
import { Product, ProductExpiryArgs } from "../types/generated"

const indexResolvers = {
  UPC: GraphQLUPCAType,
  Date: DateResolver,
  Product: {
    expiry: (parent: Product, args: ProductExpiryArgs) => {
      console.log("Expiry args:", args)
      return parent.expiry
    }
  },
  Query: {
    ping: () => "pong",
    product: (_: any): Product => {
      return {
        id: "0",
        expiry: [
          {
            id: "0",
            date: "2022-02-22",
            pulled: false
          }
        ],
        price: 1.99,
        upc: "012345678901"
      }
    }
  }
}

export default indexResolvers
