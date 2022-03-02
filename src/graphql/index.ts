import { ApolloServer } from "apollo-server-express"
import indexSchema, { expirySchema, productSchema } from "./schema"
import indexResolvers from "./resolvers"
import ExpressHTTP, { ExpressConfig } from "../http"
import productMutationResolver from "./resolvers/product/mutation"
import expiryMutationResolver from "./resolvers/expiry/mutation"
import ProductsProvider from "./providers/ProductsProvider"
import { NotFoundError, UniqueViolationError } from "objection"
import GraphQLNotFoundError from "./errors/GraphQLNotFoundError"
import GraphQLUniqueViolationError from "./errors/GraphQLUniqueViolationError"
import ExpiringProvider from "./providers/ExpiringProvider"

export interface ApolloContext {
  dataSources: {
    products: ProductsProvider
    expiring: ExpiringProvider
  }
}

export default class ApolloExpressServer extends ExpressHTTP {
  server: ApolloServer

  constructor(config: ExpressConfig) {
    super(config)
    this.server = new ApolloServer({
      typeDefs: [
        indexSchema,
        productSchema,
        expirySchema
      ],
      resolvers: [
        indexResolvers,
        productMutationResolver,
        expiryMutationResolver
      ],
      dataSources: (): ApolloContext["dataSources"] => ({
        products: new ProductsProvider(),
        expiring: new ExpiringProvider()
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
