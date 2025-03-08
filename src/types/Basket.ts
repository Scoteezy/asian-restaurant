import { type Product } from "@prisma/client"

export interface Basket {
  id: string
  userId: string
  items: BasketItem[]
}

export interface BasketItem {
  id: string
  productId: string
  quantity: number
  product: Product
}

export interface BasketWithItems extends Basket {
  items: BasketItem[]
}
