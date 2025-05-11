import { HeartIcon, PlusIcon, ShoppingBasket, SoupIcon } from "lucide-react"

import { type ProductWithNutrition } from "@/types"
import { type User } from "@prisma/client"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import AddFavoriteButton from "../favorite/AddFavoriteButton"
import { MenuItemModal } from "./MenuItemModal"

const MenuItem = ({ product, user }: { product: ProductWithNutrition, user: null | User }) => {
  return (
    <div className="flex flex-col gap-2 relative rounded-md bg-muted-foreground/10 overflow-hidden  group cursor-pointer">
      {product.isSpicy && 
      <div className="absolute top-2 left-2 z-40 flex-center text-white p-1  rounded-full  bg-red-500/50 gap-1 flex items-center">
        <p className="text-xs">Остро</p>
        <SoupIcon size={16} />
      </div>}
      <div className="relative overflow-hidden h-full sm:min-h-[200px] md:min-h-[270px] max-h-[270px] min-h-[160px] w-full">
        {product.image ? (
          <Image alt="item"
            className="rounded-t-md w-full group-hover:scale-110 min-h-[160px] sm:min-h-[200px] max-h-[270px] transition-all duration-700 absolute top-0 inset-0  z-30"
            height={270}
            src={product.image}
            width={240}
          />
        ) : (
          <div className="flex-center w-full h-[150px]  sm:h-[270px] bg-muted-foreground/10 rounded-t-md ">
            <p className="text-muted-foreground/80 text-2xl font-bold">Нет фото</p>
          </div>
      
        )}
      </div>
      <div className="flex flex-col gap-3 p-2">
        <div className="flex-between ">
          <p className="text-base sm:text-lg group-hover:text-main transition-all duration-700 
          max-w-[230px] font-medium sm:font-semibold line-clamp-2"
          >{product.name}
          </p> 
          <div className="border-2 border-muted-foreground/20 rounded-full px-2 py-1 text-xs text-muted-foreground/80 hidden sm:block">
            <p>{product.gramm} г</p>
          </div>
        </div>
        <p className="hidden sm:block text-muted-foreground/80 text-sm line-clamp-1 overflow-hidden">{product.description}</p>

        <div className="flex-between">
          <div className="flex-col gap-2">
            <p className="text-lg font-semibold transition-all duration-700 ">{product.price} ₽</p>
            <p className="block sm:hidden text-muted-foreground/80 text-sm line-clamp-2">{product.gramm} г</p>
            
          </div>
          <div className="flex-center gap-2">
            <MenuItemModal product={product}
              user={user}
            />
            <AddFavoriteButton productId={product.id}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { MenuItem }
