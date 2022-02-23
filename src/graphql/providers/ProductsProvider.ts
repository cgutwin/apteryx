import { DataSource } from "apollo-datasource"
import { ProductInput } from "../types/generated"
import { create } from "../../services/product"

export default class ProductsProvider extends DataSource {
  async create(product: ProductInput) {
    return create<ProductInput>(product)
  }
}
