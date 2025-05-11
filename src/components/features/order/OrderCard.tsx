'use client'

import { type OrderWithExtendedItems } from "@/types/Order"
import Image from "next/image"

import { OrderDetailsModal } from "./OrderDetailsModal"

interface OrderCardProps {
  order: OrderWithExtendedItems
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const totalPrice = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const transformPayment = (payment: string) => {
    switch(payment) {
      case "card":
        return "Карта"
      case "cash":
        return "Наличные"
      default:
        return payment
    }
  }

  return (
    <OrderDetailsModal order={order}>
      <div className="p-4 rounded-lg bg-[#181818] hover:bg-[#1f1f1f] transition-colors cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Заказ #{order.id.slice(0, 8)}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" :
                order.status === "CONFIRMED" ? "bg-blue-500/10 text-blue-500" :
                  order.status === "DELIVERED" ? "bg-green-500/10 text-green-500" :
                    "bg-red-500/10 text-red-500"
            }`}
            >
              {order.status === "PENDING" ? "Ожидается" :
                order.status === "CONFIRMED" ? "Подтвержден" :
                  order.status === "DELIVERED" ? "Доставлен" :
                    "Отменен"}
            </span>
          </div>
          <div className="text-lg font-semibold">
            {order.totalPrice ? order.totalPrice.toLocaleString('ru-RU') : totalPrice.toLocaleString('ru-RU')} ₽
          </div>
        </div>

        

        <div className="flex gap-2">
          {order.items.slice(0, 4).map((item) => (
            <div className="h-12 w-12 rounded-md overflow-hidden bg-[#2a2a2a]"
              key={item.id}
            >
              {item.product.image ? (
                <Image
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                  height={48}
                  src={item.product.image}
                  width={48}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                  No image
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Способ оплаты:</span>
              <span className="text-white">{transformPayment(order.payment)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Способ получения:</span>
              <span className="text-white">{order.locationId ? "Доставка" : "Самовывоз"}</span>
            </div>
          </div>
        </div>
      </div>
    </OrderDetailsModal>
  )
} 
