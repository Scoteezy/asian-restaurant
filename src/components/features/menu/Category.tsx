import { type Category } from "@/types"

import { MenuItem } from "./MenuItem"
const Category = ({ category }: { category: Category }) => {
  return (
    <div className="flex flex-col gap-2 scroll-mt-[70px]"
      id={category.name}
    >
      <p className="text-2xl font-semibold mb-5">{category.name}</p>
      <div className="grid grid-cols-4 gap-3 w-full">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </div>
  )
}

export { Category }
