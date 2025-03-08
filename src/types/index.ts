import { type Address } from "./Address"
import { type Basket, type BasketItem, type BasketWithItems } from "./Basket"
import { type Category, type CategoryWithProducts } from "./Category"
import { type Favorite } from "./Favorite"
import { type ProductWithCategory, type ProductWithNutrition } from "./Products"

interface Response<T> {
  success: boolean
  data: null | T
  error: null | string
}


export type { Address, Basket, BasketItem, BasketWithItems, Category, CategoryWithProducts, Favorite, ProductWithCategory, ProductWithNutrition, Response }
