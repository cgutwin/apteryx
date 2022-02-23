import { Model, QueryContext } from "objection"

export class ModelWithTimestamps extends Model {
  createdAt!: string
  updatedAt!: string

  $beforeInsert(queryContext: QueryContext) {
    this.createdAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
  }
}
