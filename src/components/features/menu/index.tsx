
import { getAllCategoriesWithProductsAction } from "@/server/actions/category.actions"

import { Category } from "./Category"

const Menu = async() => {
  const categories = await getAllCategoriesWithProductsAction()

  return (
    <main className="wrapper font-sans flex flex-col gap-5">
      {categories.map((category) => (
        <Category categoryWithProducts={category}
          key={category.id}
        />
      ))}

    </main>
  )
}

export { Menu }
