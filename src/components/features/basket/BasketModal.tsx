'use client'
import { Loader2, Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import { toast } from "@/hooks/use-toast"
import { addToBasket, deleteFromBasket, getBasket } from "@/server/actions/basket.actions"
import { getUserAction } from "@/server/actions/user.actions"
import { type BasketWithItems } from "@/types"
import { type User } from "@prisma/client"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import OrderModal from "../order/OrderModal"
import { BasketItem } from "./BasketItem"
const BasketModal = () => {
  const [open, setOpen] = useState(false)
  const [basket, setBasket] = useState<BasketWithItems | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const fetchBasket = async () => {
    const response = await getBasket()

    setBasket(response.data)
  }

  useEffect(() => {
    setInitialLoad(true)
    if(open) {
      void fetchBasket()
    }
    setInitialLoad(false)

  }, [open])


  return (
    <Dialog onOpenChange={setOpen}
      open={open}
      
    >
      <DialogTrigger asChild>
        <Button className="rounded-full text-md relative"
          size="icon"
          variant="secondary"
        >
          <ShoppingBag height={18}
            size={18}
            width={18}
          />
          
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Корзина</DialogTitle>
        </DialogHeader>
        {initialLoad && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin"
              size={24}
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          {basket?.items.map((item) => (
            <BasketItem fetchBasket={fetchBasket}
              item={item}
              key={item.id}
            />
          ))}
          {basket?.items.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Ваша корзина пуста
            </div>
          )}
          {basket?.items.length != 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex  items-center justify-end">
            
            
              <OrderModal 
                totalPrice={basket?.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BasketModal
