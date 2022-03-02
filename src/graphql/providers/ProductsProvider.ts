import { DataSource } from "apollo-datasource"
import { PartialProductInput, ProductInput } from "../types/generated"
import { create, findByUPC, patch } from "../../services/product"

export default class ProductsProvider extends DataSource {
  async create(product: ProductInput) {
    return create<ProductInput>(product)
  }

  async findByUPC(upc: ProductInput["upc"]) {
    return findByUPC(upc)
  }

  async patch(upc: ProductInput["upc"], data: PartialProductInput) {
    return patch<PartialProductInput>(upc, data)
  }
}
