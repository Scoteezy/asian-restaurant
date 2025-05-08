import { getBasket } from "@/server/actions/basket.actions"
import { getUserAction } from "@/server/actions/user.actions"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { BasketItem } from "@/components/features/basket/BasketItem"
import OrderModal from "@/components/features/order/OrderModal"
export const metadata: Metadata = {
  title: "Корзина | Nami",
  description: "Корзина",
}
export default async function BasketPage() {
  const user = await getUserAction()
  const basket = await getBasket()

  if(!user.success || !user.data) {
    redirect('/')
  }
  if(!basket.success || !basket.data) {
    return(
      <div className="wrapper">
        <h1 className="text-2xl font-bold">Корзина</h1>
        <p className="text-gray-500">Произошла ошибка при получении корзины. Попробуйте позже.</p>
      </div>
    )
  }
  return (
    <div className="wrapper">
      <h1 className="text-2xl font-bold">Корзина</h1>
      <div className="flex flex-col gap-4">
        {basket?.data?.items.map((item) => (
          <BasketItem 
            item={item}
            key={item.id}
          />
        ))}
        {basket?.data?.items.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            Ваша корзина пуста
          </div>
        )}
        {basket?.data?.items.length != 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex  items-center justify-end">
            
            
            <OrderModal totalPrice={basket?.data?.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)}/>
          </div>
        )}
      </div>
    </div>
  )
}
