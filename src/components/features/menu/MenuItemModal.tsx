"use client"
'use client'

import { PlusIcon, SoupIcon } from "lucide-react"
import { useState } from "react"

import { type ProductWithNutrition } from "@/types"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface MenuItemModalProps {
  product: ProductWithNutrition
}

const MenuItemModal = ({ product }: MenuItemModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <div >
          <Button 
            className="hidden sm:flex-center gap-2 rounded-full bg-transparent border 
            border-main text-main font-bold hover:bg-main hover:text-white transition-all duration-700"
          >
            Выбрать <PlusIcon size={16} />
          </Button>
          <Button 
            className="block sm:hidden flex-center gap-2 rounded-full bg-transparent border 
            border-main text-main font-bold hover:bg-main hover:text-white transition-all duration-700"
            size={'icon'}
          >
            <PlusIcon size={16} />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] p-0 bg-background">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="relative w-full h-[300px]">
          {product.isSpicy && 
          <div className="absolute top-2 left-2 z-40 flex-center text-white p-1  rounded-full  bg-red-500/50 gap-1 flex items-center">
            <p className="text-xs">Остро</p>
            <SoupIcon size={16} />
          </div>}
          <Image
            alt={product.name}
            className="w-full h-full object-cover" 
            fill
            src={product.image ?? ''}
          />
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{product.name}  <p className="text-sm text-muted-foreground/80 mt-2">{product.gramm} г</p></h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="font-bold">{product.nutrition?.calories}</p>
              <p className="text-xs text-muted-foreground">ККал</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{product.nutrition?.proteins}</p>
              <p className="text-xs text-muted-foreground">Белки</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{product.nutrition?.fats}</p>
              <p className="text-xs text-muted-foreground">Жиры</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{product.nutrition?.carbohydrates}</p>
              <p className="text-xs text-muted-foreground">Углеводы</p>
            </div>
          </div>

          <Button 
            className="w-full rounded-full bg-main text-white hover:bg-main/90"
            variant="secondary"
          >
            Добавить за {product.price} ₽
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { MenuItemModal }
