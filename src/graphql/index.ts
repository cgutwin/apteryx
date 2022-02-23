import { ApolloServer } from "apollo-server-express"
import indexSchema from "./schema"
import indexResolvers from "./resolvers"
import ExpressHTTP, { ExpressConfig } from "../http"
import productSchema from "./schema/product"
import productMutationResolver from "./resolvers/product/mutation"
import ProductsProvider from "./providers/ProductsProvider"
import { NotFoundError, UniqueViolationError } from "objection"
import GraphQLNotFoundError from "./errors/GraphQLNotFoundError"
import GraphQLUniqueViolationError from "./errors/GraphQLUniqueViolationError"

export interface ApolloContext {
  dataSources: {
    products: ProductsProvider
  }
}

export default class ApolloExpressServer extends ExpressHTTP {
  server: ApolloServer

  constructor(config: ExpressConfig) {
    super(config)
    this.server = new ApolloServer({
      typeDefs: [
        indexSchema,
        productSchema
      ],
      resolvers: [
        indexResolvers,
        productMutationResolver
      ],
      dataSources: (): ApolloContext["dataSources"] => ({
        products: new ProductsProvider()
      }),
      formatError: (err) => {
        const { originalError }: { originalError: any } = err

        if (originalError instanceof NotFoundError) {
          return new GraphQLNotFoundError("Product not found.")
        } else if (originalError instanceof UniqueViolationError) {
          return new GraphQLUniqueViolationError("Already exists at the given UPC.")
        }

        return err
      }
    })
  }

  injectGraphQLServer() {
    this.server.start()
        .then(() => {
          this.server.applyMiddleware({ app: this.application })
        })

    return this
  }
}
