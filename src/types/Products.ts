import { type Category, type Product } from "@prisma/client"

export interface Nutrition {
  carbohydrates: number
  fats: number
  proteins: number
  calories: number
}

export interface ProductWithCategory extends Omit<Product, 'nutrition'> {
  nutrition?: Nutrition
  category: Category
}
export interface ProductWithNutrition extends Omit<Product, 'nutrition'> {
  nutrition?: Nutrition
}
