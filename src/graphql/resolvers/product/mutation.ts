import { ProductMutationCreateArgs } from "../../types/generated"
import { ApolloContext } from "../../index"

const productMutationResolver = {
  async create(_: any, args: ProductMutationCreateArgs, { dataSources }: ApolloContext) {
    return dataSources.products.create(args.product)
  }
}

export default {
  ProductMutation: productMutationResolver,
  Mutation: {
    // Pass down the mutation paths to the resolver.
    product: () => ({})
  }
}
