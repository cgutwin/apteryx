import ApolloExpressServer from "./graphql"

const server = new ApolloExpressServer({
  port: process.env.PORT as unknown as number
})

server
  .injectGraphQLServer()
  .init()
