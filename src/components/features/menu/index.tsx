
import { Loader2 } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { getAllCategoriesWithProductsAction } from "@/server/actions/category.actions"

import { Category } from "./Category"

const Menu = async() => {
  const categories = await getAllCategoriesWithProductsAction()

  if(!categories.success || !categories.data) {
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
  console.log(categories.data)
  return (
    <main className="wrapper font-sans flex flex-col gap-5">
      {categories.data?.map((category) => (
        <Category categoryWithProducts={category}
          key={category.id}
        />
      ))}

    </main>
  )
}

export { Menu }
