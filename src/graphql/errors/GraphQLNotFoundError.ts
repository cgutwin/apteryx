import { ApolloError } from "apollo-server-core"

export default class GraphQLNotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'DB_NOT_FOUND_ERROR');

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
