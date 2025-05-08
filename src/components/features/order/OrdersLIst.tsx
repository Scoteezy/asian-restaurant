import { getUserOrdersAction } from "@/server/actions/order.actions"

import { OrderCard } from "./OrderCard"

export const OrdersList = async () => {
  const orders = await getUserOrdersAction()

  if(orders.error || !orders.data){
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-primary">Избранное</h2>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          Произошла ошибка при получении избранных блюд. Попробуйте позже.
        </p>
      </div>
    )
  }
  if(orders.data.length === 0){
    return(
      <p className="text-sm text-gray-500 flex items-center">Тут пока что ничего нет</p>
    )
  }
  return (
    <div className="flex flex-col gap-4 mt-4 h-[270px] overflow-y-auto">
        
      {orders.data.map((order) => (
        <OrderCard key={order.id}
          order={order}
        />
      ))}
    </div>
  )
}
