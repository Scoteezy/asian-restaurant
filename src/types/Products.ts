import { type Category, type Product } from "@prisma/client"

export type ProductWithCategory = Product & {
  category: Category
}
