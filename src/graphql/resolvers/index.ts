import GraphQLUPCAType from "../scalars/upc"
import { DateResolver } from "graphql-scalars"
import { Product, ProductExpiryArgs, QueryProductArgs } from "../types/generated"
import { ApolloContext } from "../index"

const indexResolvers = {
  UPC: GraphQLUPCAType,
  Date: DateResolver,
  Product: {
    expiry: async (parent: Product, args: ProductExpiryArgs, { dataSources }: ApolloContext) => {
      const upc = parent.upc
      return dataSources.expiring.findByUPC(upc)
    }
  },
  Query: {
    ping: () => "pong",
    product: (_: any, args: QueryProductArgs, { dataSources }: ApolloContext) => dataSources.products.findByUPC(args.upc)
  }
}

export default indexResolvers
