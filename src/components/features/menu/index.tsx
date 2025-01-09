import { type Category as CategoryType } from "@/types"

import { Category } from "./Category"
const categories: CategoryType[] = [
  {
    id: "1",
    name: "Вок"
  },
  {
    id: "2",
    name: "Супы"
  },
  {
    id: "3",
    name: "Салаты"
  },
  {
    id: "4",
    name: "Закуски"
  },
  {
    id: "5",
    name: "Роллы и суши"
  },
  {
    id: "6",
    name: "Десерты"
  },
  {
    id: "7",
    name: "Напитки"
  },
]
const Menu = () => {
  return (
    <main className="wrapper font-sans flex flex-col gap-5">
      {categories.map((category) => (
        <Category category={category}
          key={category.id}
        />
      ))}

    </main>
  )
}

export { Menu }
