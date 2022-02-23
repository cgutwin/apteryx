# Apteryx

> Kiwi are flightless birds endemic to New Zealand of the genus Apteryx &mdash; [Wikipedia][1]

The backend server for apteryx, a grocery store inventory management tool. Implemented with Express, Apollo GraphQL, 
and Postgres.

## Features
Apteryx currently features a:
- Product catalog with fields for price information and distributor data
- List of expiring products with dates and pull information

Planned features (in no particular order):
- Topstock counting for inventory management &mdash; open an aisle, work the topstock, and scan in the remaining
- Product scan and search for finding products
- Sale price programmer to automatically time price changes in the database
- Order system, generating and entering order information

## Installing
Included is a docker compose file, which should run everything &mdash; server, migrations, and database. Add a .env 
file with the args outlined within `docker-compose.yml`, and run.

## Managing GraphQL Queries
The root `index.ts` file in `/src/graphql` manages configuration of schema, resolvers, and data sources for Apollo.

### Schema
Schema definitions are namespaced to their purpose. Each will have definition, extending the base query and mutation 
types.

Schema mutations are abstracted further, nesting the resolvers into the namespaced entry for better organization of 
repeated query names. This means queries normally shaped like this:
```graphql
# Incorrect query usage for the defined schema.
mutation Mutation($product: ProductInput!) {
    createProduct(product: $product) {
        id
    }
}
```
... turn into a query with the function nested one level further, like this:
```graphql
# Correct.
mutation Mutation($product: ProductInput!) {
    # Namespaced "product"
    product {
        # Create function is nested one level in.
        create(product: $product) {
            id
        }
    }
}
```

### Resolvers
Resolvers pass logic to the respective data source provider. When modifying mutations, keep in mind the extra query 
layer, [as demonstrated above](#schema). As of this, they're in their namespaced folders, with files for query and mutation 
objects.

Both resolvers are exported and added to the `resolvers` field in the [graphql index file](#managing-graphql-queries).

Exported resolvers, again because of the layered mutation schema, export an object. This is to pass the query 
to a default resolver, which handles the request. You can find an example of this in the 
[product mutation resolver](src/graphql/resolvers/product/mutation.ts).

### Data Sources

Data sources reference provider classes, stored in `/src/graphql/providers`. These just interact with the services 
layer (`/src/services`) to perform database transactions based on GraphQL types.

When adding new data sources, update the interface in the graphql index file to include the new types.

[1]: https://en.wikipedia.org/wiki/Kiwi_(bird)
