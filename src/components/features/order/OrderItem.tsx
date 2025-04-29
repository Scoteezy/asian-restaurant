'use client'
import { Minus, Plus, Trash } from "lucide-react"
import { useState } from "react"

import { toast } from "@/hooks/use-toast"
import { addToBasket, deleteFromBasket } from "@/server/actions/basket.actions"
import { type BasketItem } from "@/types/Basket"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

const OrderItem = ({item, fetchBasket}: {item: BasketItem, fetchBasket?: () => void}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const deleteProductFromBasket = async (productId: string) => {
    setIsLoading(true)

    const response = await deleteFromBasket(productId)

    if (response.success) {
      toast({
        title: "Товар удален из корзины",
      })
      fetchBasket?.()
      router.refresh()

    } else {
      toast({
        title: "Ошибка при удалении товара из корзины",
      })
    }
    setIsLoading(false)
  }
  const addProductToBasket = async (productId: string) => {
    setIsLoading(false)

    const response = await addToBasket(productId)

    if (response.success) {
      toast({
        title: "Товар добавлен в корзину",
      })
      fetchBasket?.()
      router.refresh()

    }else{
      toast({
        title: "Ошибка при добавлении товара в корзину",
      })
    }
    setIsLoading(false)
  }

  return  (
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
      <div className="flex self-start gap-2">
        <Button 
          className="h-7 px-2 text-xs bg-main text-white" 
          disabled={isLoading} 
          onClick={() => addProductToBasket(item.productId)}
          size="sm"
          variant="destructive"
        >
          <Plus
            size={16}
          />
        </Button>
        <Button 
          className="h-7 px-2 text-xs bg-main text-white" 
          disabled={isLoading} 
          onClick={() => deleteProductFromBasket(item.id)}
          size="sm"
          variant="destructive"
        >
          {item.quantity > 1 ? (
            <Minus
              size={16}
            />
          ) : (
            <Trash
              size={16}
            />
          )}
        </Button>
      </div>
    </div>
  )
}

export {OrderItem}
