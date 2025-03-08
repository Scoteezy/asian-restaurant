
import { type ProductWithNutrition } from "./Products";

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryWithProducts extends Category {
  Product: ProductWithNutrition[]
}
