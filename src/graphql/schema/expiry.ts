import { gql } from "apollo-server-express"

const expirySchema = gql`
    enum DateQualifier {
        ON
        BEFORE
        AFTER
    }

    input ExpiryInput {
        date: Date!
        upc: UPC!
    }

    input ExpiryFilterArg {
        qualifier: DateQualifier!
        date: Date!
    }

    type Expiry {
        id: ID!
        date: Date!
        upc: UPC!
    }
    
    type ExpiryMutation {
        create(expiry: ExpiryInput!): Expiry!
        "Delete an expiry given an ID. Returns the number of records deleted."
        deleteByID(id: ID!): Int!
        "Delete all expiring for a given UPC. Returns the number of records deleted."
        deleteByUPC(upc: UPC!): Int!
    }
`

export default expirySchema
