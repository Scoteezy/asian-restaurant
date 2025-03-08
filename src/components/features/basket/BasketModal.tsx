import { ShoppingBag, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import { getBasket } from "@/server/actions/basket.actions"
import { type BasketWithItems } from "@/types"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
const BasketModal = () => {
  const [basket, setBasket] = useState<BasketWithItems | null>(null)

  useEffect(() => {
    const fetchBasket = async () => {
      const response = await getBasket()

      setBasket(response.data)
    }

    void fetchBasket()
  }, [])
  console.log(basket)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full text-md"
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
        <div className="flex flex-col gap-4">
          {basket?.items.map((item) => (
            <div className="flex items-center justify-between p-3 rounded-lg   shadow-sm"
              key={item.id}
            >
              <div className="flex self-start gap-3">
                {item.product.image && (
                  <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                    <Image 
                      alt={item.product.name} 
                      className="h-full w-full object-cover" 
                      height={40}
                      src={item.product.image}
                      width={40}
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{item.product.price} ₽</p>
                    <p className="text-gray-500 text-xs">{item.quantity} шт.</p>
                  </div>

                </div>
              </div>
              <div className="flex self-start">
                <Button 
                  className="h-7 px-2 text-xs" 
                  onClick={() => {/* Здесь будет функция удаления */}} 
                  size="sm"
                  variant="destructive"
                >
                  <Trash
                    size={16}
                  />
                </Button>
              </div>
            </div>
          ))}
          {basket?.items.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Ваша корзина пуста
            </div>
          )}
          {basket?.items.length && basket?.items.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <p className="font-medium">Итого:</p>
              <p className="font-bold text-lg">
                {basket.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)} ₽
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BasketModal
