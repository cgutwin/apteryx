import { ModelWithTimestamps } from "./ModelWithTimestamps"

export default class Product extends ModelWithTimestamps {
  static tableName = "products"
  static jsonSchema = {
    type: "object",
    required: [ "price", "upc" ],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      price: { type: "number" },
      upc: { type: "string", pattern: "^(?=.*0)[0-9]{12}$" }
    }
  }
}
