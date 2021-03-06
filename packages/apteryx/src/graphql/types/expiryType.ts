import { gql } from "graphql-modules"

export default gql`
  enum ExpiringOnWhen {
    ON
    BEFORE
    AFTER
  }

  # Hack in bigint with float
  input ExpiryInput {
    upc: String!
    expiring: Float!
  }

  type Expiry {
    upc: String!
    expiring: Float!
    isPulled: Boolean!
  }

  type ExpiryLookup {
    upc: String!
    expiring: Float!
    product: [Product]
    isPulled: Boolean!
  }

  extend type Query {
    expiring: [ExpiryLookup]
    expiringOn(date: Float!, when: ExpiringOnWhen!): [ExpiryLookup]
    queryAllPulled(date: Float): [ExpiryLookup]
  }

  extend type Mutation {
    createExpiry(expiry: ExpiryInput!): Expiry
    updatePullState(upc: String!, value: Boolean!): Expiry
  }
`
