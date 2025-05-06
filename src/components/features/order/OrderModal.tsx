'use client'
import { Loader2, Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import { toast } from "@/hooks/use-toast"
import { addToBasket, deleteFromBasket, getBasket } from "@/server/actions/basket.actions"
import { type BasketWithItems } from "@/types"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { LocationList } from "../location/LocationList"
import { SelfPickupForm } from "../location/SelfPickUpForm"
import { OrderItem } from "./OrderItem"
const OrderModal = ({totalPrice}: {totalPrice?: number}) => {
  const [open, setOpen] = useState(false)
  const [basket, setBasket] = useState<BasketWithItems | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const fetchBasket = async () => {
    const response = await getBasket()

    setBasket(response.data)
  }

  useEffect(() => {
    setInitialLoad(true)

    if (open) {
      void fetchBasket()
    }
    setInitialLoad(false)

  }, [open])


  return (
    <Dialog 
      modal
      onOpenChange={setOpen}
      open={open}

    >
      <DialogTrigger asChild>
        <Button className=" text-md bg-main text-white flex items-center justify-center gap-2 "
              
          variant="destructive"
        >  
          Оформить заказ -
          <p className=" ">
            {totalPrice} ₽
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full" >
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
        </DialogHeader>
        {initialLoad && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin"
              size={24}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 w-full" >
          <div className="w-1/2">
            <Tabs 
              className="w-full "
              defaultValue="selfPickup"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selfPickup">Самовывоз</TabsTrigger>
                <TabsTrigger 
                  value="delivery"
                >
                  Доставка
                </TabsTrigger>
              </TabsList>
              <TabsContent value="selfPickup">
                <SelfPickupForm />
              </TabsContent>
              <TabsContent value="delivery">
                {/* <LocationList/> */}
              </TabsContent>
            </Tabs>
          </div>
          {basket?.items.length != 0 && (
            <div className=" flex flex-col self-start  w-1/2">
              <div className="flex flex-col gap-2 border-b-2 border-[hsla(0,0%,100%,.1)] pb-2 w-full">
                <p className="text-lg font-bold">Итого</p>
                <p className="text-sm flex-between">В корзине {basket?.items.length} товаров <span>{basket?.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)} ₽ </span></p>
                <p className="text-sm flex-between">Доставка 400 ₽ <span>400 ₽</span></p>
              </div>
              <Button className=" text-md bg-main text-white flex items-center justify-center gap-2 mt-2"
              
                variant="destructive"
              >  
                Оформить заказ
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
