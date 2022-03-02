import { ModelWithTimestamps } from "./ModelWithTimestamps"
import { Pojo } from "objection"

export default class Expiry extends ModelWithTimestamps {
  static tableName = "expiring"
  static jsonSchema = {
    type: "object",
    required: [ "upc" ],
    properties: {
      id: { type: "string" },
      upc: { type: "string", pattern: "^(?=.*0)[0-9]{12}$" }
    }
  }

  id!: string
  upc!: string
  
  $formatDatabaseJson(json: Pojo) {
    json = super.$formatDatabaseJson(json)
    json["date"] = json["date"].toISOString()
    return json
  }
}
