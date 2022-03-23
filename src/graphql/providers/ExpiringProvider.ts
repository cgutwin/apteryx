import { DataSource } from "apollo-datasource"
import { ExpiryInput, QueryExpiryByUpcArgs } from "../types/generated"
import { create, findByUPC, remove } from "../../services/expiring"

export default class ExpiringProvider extends DataSource {
  async findByUPC(upc: string, args: QueryExpiryByUpcArgs) {
    return findByUPC({ upc, args })
  }

  async create(expiry: ExpiryInput) {
    return create<ExpiryInput>(expiry)
  }

  async delete<TData>(data: TData) {
    return remove<TData>(data)
  }
}
