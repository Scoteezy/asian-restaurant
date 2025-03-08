import { type ProductWithNutrition } from "./Products"

export interface Favorite {
  id: string
  userId: string
  productId: string
  createdAt: Date
  updatedAt: Date
  product: ProductWithNutrition
}
