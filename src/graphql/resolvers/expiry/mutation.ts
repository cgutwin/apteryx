import {
  ExpiryMutationCreateArgs,
  ExpiryMutationDeleteByIdArgs,
  ExpiryMutationDeleteByUpcArgs
} from "../../types/generated"
import { ApolloContext } from "../../index"

const expiryMutationResolver = {
  async create(_: any, args: ExpiryMutationCreateArgs, { dataSources }: ApolloContext) {
    return dataSources.expiring.create(args.expiry)
  },
  async deleteByID(_: any, args: ExpiryMutationDeleteByIdArgs, { dataSources }: ApolloContext) {
    return dataSources.expiring.delete<typeof args>({ ...args })
  },
  async deleteByUPC(_: any, args: ExpiryMutationDeleteByUpcArgs, { dataSources }: ApolloContext) {
    return dataSources.expiring.delete<typeof args>({ ...args })
  }
}

export default {
  ExpiryMutation: expiryMutationResolver,
  Mutation: {
    // Pass down the mutation paths to the resolver.
    expiry: () => ({})
  }
}
