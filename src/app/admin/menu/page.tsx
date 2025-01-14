import { getAllCategoriesAction } from "@/server/actions/category.actions";
import { getAllProductsAction } from "@/server/actions/products.actions";

import CategoryTable from "@/components/features/admin/CategoryTable";
import MenuTable from "@/components/features/admin/MenuTable";

export default async function MenuPage() {
  const products = await getAllProductsAction()
  const categories = await getAllCategoriesAction()

  return (
    <div className="flex flex-col gap-10 ">
      <MenuTable
        categories={categories}
        products={products}
      />
      <CategoryTable categories={categories} />
    </div>
  )
}
