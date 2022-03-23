import GraphQLUPCAType from "../scalars/upc"
import { DateResolver } from "graphql-scalars"
import { Product, QueryExpiryByUpcArgs, QueryProductArgs } from "../types/generated"
import { ApolloContext } from "../index"

const indexResolvers = {
  UPC: GraphQLUPCAType,
  Date: DateResolver,
  Product: {
    expiry: async (parent: Product, args: QueryExpiryByUpcArgs, { dataSources }: ApolloContext) => {
      const upc = parent.upc
      return dataSources.expiring.findByUPC(upc, args)
    }
  },
  Query: {
    ping: () => "pong",
    product: (_: any, args: QueryProductArgs, { dataSources }: ApolloContext) => dataSources.products.findByUPC(args.upc),
    expiryByUPC: (_: any, args: QueryExpiryByUpcArgs, { dataSources }: ApolloContext) => dataSources.expiring.findByUPC(args.upc, args)
  }
}

export default indexResolvers
