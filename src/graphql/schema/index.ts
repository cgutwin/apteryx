import { gql } from "apollo-server-express"

const indexSchema = gql`
    scalar UPC
    scalar Date

    enum DateQualifier {
        ON
        BEFORE
        AFTER
    }

    input ExpiryFilterArg {
        qualifier: DateQualifier!
        date: Date!
    }

    type Expiry {
        id: ID!
        date: Date!
        pulled: Boolean!
    }

    type Query {
        ping: String!
    }

    type Mutation
`

export default indexSchema
