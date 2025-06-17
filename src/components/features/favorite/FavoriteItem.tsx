import { SoupIcon, Trash2Icon } from "lucide-react"

import { type Favorite } from "@/types/Favorite"
import { type User } from "@prisma/client"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import { MenuItemModal } from "../menu/MenuItemModal"
import AddFavoriteButton from "./AddFavoriteButton"

const FavoriteItem = ({ favorite }: { favorite: Favorite}) => {
  const { product } = favorite

  return (
    <div className="flex gap-3 relative rounded-md bg-muted-foreground/10 overflow-hidden p-2 group">
      {product.isSpicy && 
      <div className="absolute top-2 left-2 z-40 flex-center text-white p-1 rounded-full bg-red-500/50 gap-1 flex items-center">
        <SoupIcon size={14} />
      </div>}
      
      <div className="relative overflow-hidden h-[80px] w-[80px] min-w-[80px]">
        {product.image ? (
          <Image 
            alt={product.name}
            className="rounded-md w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            height={80}
            src={product.image}
            width={80}
          />
        ) : (
          <div className="flex-center w-full h-full bg-muted-foreground/10 rounded-md">
            <p className="text-muted-foreground/80 text-xs font-bold">Нет фото</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium group-hover:text-main transition-all duration-700 max-w-[200px] line-clamp-2 w-full">
            {product.name}
          </p>
          
          <p className="text-sm font-semibold w-[60px]">{product.price} ₽</p>

        </div>
        
        
        <div className="flex-between mt-auto self-end">
          
          <div className="flex-center gap-2">
            <MenuItemModal isFavorite={true}
              product={product}
            />
            <AddFavoriteButton productId={product.id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavoriteItem
