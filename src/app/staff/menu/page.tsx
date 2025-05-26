import { Loader2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { getAllCategoriesAction, getAllCategoriesWithDeletedAction } from "@/server/actions/category.actions";
import { getAllProductsAction, getAllProductsWithDeletedAction } from "@/server/actions/products.actions";

import CategoryTable from "@/components/features/admin/CategoryTable";
import MenuTable from "@/components/features/admin/MenuTable";

export default async function MenuPage() {
  const products = await getAllProductsAction() 
  const categories = await getAllCategoriesAction()
  const productsWithDeleted = await getAllProductsWithDeletedAction()
  const categoriesWithDeleted = await getAllCategoriesWithDeletedAction()

  if(!products.success || !products.data) {
    toast({
      title: "Ошибка при получении данных меню",
      description: "Попробуйте позже",
    })
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }
  if(!categories.success || !categories.data) {
    toast({
      title: "Ошибка при получении данных категорий",
      description: "Попробуйте позже",
    })
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col gap-10 ">
      <MenuTable
        categories={categories.data }
        products={products.data}
      />
      <CategoryTable categories={categories.data} />
      <MenuTable
        caption="Список всех удаленных позиций меню."
        categories={categories.data }
        isDeleted={true}
        products={productsWithDeleted.data ?? []}
      />
      <CategoryTable caption="Список всех удаленных категорий."
        categories={categoriesWithDeleted.data ?? []}
        isDeleted={true}
      />
    </div>
  )
}
