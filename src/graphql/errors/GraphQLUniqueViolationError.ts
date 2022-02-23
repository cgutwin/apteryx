import { ApolloError } from "apollo-server-core"

export default class GraphQLUniqueViolationError extends ApolloError {
  constructor(message: string) {
    super(message, 'DB_UNIQUE_VIOLATION_ERROR');

    Object.defineProperty(this, 'name', { value: 'UniqueViolationError' });
  }
}
