import { ModelWithTimestamps } from "./ModelWithTimestamps"
import { Model } from "objection"
import Expiry from "./Expiry"

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
  static relationMappings = {
    expiring: {
      relation: Model.HasManyRelation,
      modelClass: Expiry,
      join: {
        from: "products.upc",
        to: "expiring.upc"
      }
    }
  }
}
