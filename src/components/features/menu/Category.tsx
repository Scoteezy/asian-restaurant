import { getUserAction } from "@/server/actions/user.actions"
import { type CategoryWithProducts } from "@/types"

import { MenuItem } from "./MenuItem"
const Category = async ({ categoryWithProducts }: { categoryWithProducts: CategoryWithProducts }) => {
  const user = await getUserAction()

  return (
    <div className="flex flex-col gap-2 scroll-mt-[70px]"
      id={categoryWithProducts.name}
    >
      <p className="text-2xl font-semibold mb-5">{categoryWithProducts.name}</p>
      <div className="grid grid-cols-2 max-md:mt-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {categoryWithProducts.Product.map((product) => (
          <MenuItem key={product.id}
            product={product}
            user={user.data}
          />
        ))}
       
      </div>
    </div>
  )
}

export { Category }
