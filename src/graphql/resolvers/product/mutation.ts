import { ProductMutationCreateArgs, ProductMutationUpdateArgs } from "../../types/generated"
import { ApolloContext } from "../../index"

const productMutationResolver = {
  async create(_: any, args: ProductMutationCreateArgs, { dataSources }: ApolloContext) {
    return dataSources.products.create(args.product)
  },
  async update(_: any, args: ProductMutationUpdateArgs, { dataSources }: ApolloContext) {
    const { upc, data } = args
    return dataSources.products.patch(upc, data)
  }
}

export default {
  ProductMutation: productMutationResolver,
  Mutation: {
    // Pass down the mutation paths to the resolver.
    product: () => ({})
  }
}
