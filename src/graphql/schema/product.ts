import { gql } from "apollo-server-express"

const productSchema = gql`
    "Fields required to create a new product in the database."
    input ProductInput {
        name: String!
        price: Float!
        upc: UPC!
    }

    "Fields required to update a new product in the database. All optional."
    input PartialProductInput {
        name: String
        price: Float
        upc: UPC
    }

    type Product {
        "Product ID set from the database."
        id: ID!
        """
        Retrieve an array of expiry information for a product, with the
        ability to filter down dates to return.

        The filter input is defined as either an array of filter(s). Multiple filters in the array are joined with AND.
        """
        expiry(first: Int = 2, filter: [ExpiryFilterArg!]): [Expiry]!
        "Recognizable name of the product."
        name: String!
        "Scalar price value."
        price: Float!
        "UPC-A type, including parity digit, of the product."
        upc: UPC!
    }
    
    type ProductMutation {
        "Create a product given the required ProductInput."
        create(product: ProductInput!): Product!
        update(upc: UPC!, data: PartialProductInput!): Product!
    }

    extend type Query {
        "Query for a product given the UPC-A code."
        product(upc: UPC): Product!
    }
`

export default productSchema

