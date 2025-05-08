import { type Address } from "./Address"
import { type Basket, type BasketItem, type BasketWithItems } from "./Basket"
import { type Category, type CategoryWithProducts } from "./Category"
import { type Favorite } from "./Favorite"
import { type Location, type RawLocation } from "./Location"
import { type CreateOrderInput, type CreateOrderItem, type Order, type OrderItem } from "./Order"
import { type ProductWithCategory, type ProductWithNutrition } from "./Products"
import { type RawRestaurantPickupLocation, type RestaurantPickupLocation } from "./RestaurantLocation"
interface Response<T> {
  success: boolean
  data: null | T
  error: null | string
}

export type { Address, Basket, BasketItem, BasketWithItems, Category, CategoryWithProducts, CreateOrderInput, CreateOrderItem, Favorite, Location, Order, OrderItem, ProductWithCategory, ProductWithNutrition, RawLocation, RawRestaurantPickupLocation, Response, RestaurantPickupLocation }
