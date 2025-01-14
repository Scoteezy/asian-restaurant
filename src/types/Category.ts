
import { type ProductWithNutrition } from "./Products";

export type Category = {
  id: string;
  name: string;
  description: string;
}

export interface CategoryWithProducts extends Category {
  Product: ProductWithNutrition[]
}
