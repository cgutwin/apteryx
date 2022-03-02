import { DataSource } from "apollo-datasource"
import { ExpiryInput, ProductInput } from "../types/generated"
import { create, findByUPC, remove } from "../../services/expiring"

export default class ExpiringProvider extends DataSource {
  async findByUPC(upc: ProductInput["upc"]) {
    return findByUPC(upc)
  }

  async create(expiry: ExpiryInput) {
    return create<ExpiryInput>(expiry)
  }

  async delete<TData>(data: TData) {
    return remove<TData>(data)
  }
}
