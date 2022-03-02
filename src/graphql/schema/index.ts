import { gql } from "apollo-server-express"
import expirySchema from "./expiry"
import productSchema from "./product"


const indexSchema = gql`
    scalar UPC
    scalar Date
    
    type Query {
        ping: String!
    }

    type Mutation {
        "All mutation functions for product operations."
        product: ProductMutation!
        "All mutation functions for expiry operations."
        expiry: ExpiryMutation!
    }
`

export default indexSchema
export { productSchema, expirySchema }
