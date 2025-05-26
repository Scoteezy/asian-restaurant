'use client'

import { useEffect, useState } from "react"

import { toast } from "@/hooks/use-toast"
import { getLocationByIdAction } from "@/server/actions/location.actions"
import { updateOrderStatusAction } from "@/server/actions/order.actions"
import { getRestaurantLocationByIdAction } from "@/server/actions/restaurant-locations.actions"
import { type Location, type RestaurantPickupLocation } from "@/types"
import { type OrderWithExtendedItems } from "@/types/Order"
import { OrderStatus } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface OrderDetailsModalProps {
  order: OrderWithExtendedItems
  children: React.ReactNode
}

export const OrderDetailsModal = ({ order, children }: OrderDetailsModalProps) => {
  const [open, setOpen] = useState(false)
  const [orderLocation, setOrderLocation] = useState<Location | null | RestaurantPickupLocation>(null)
  const router = useRouter()

  const handleCancelOrder = async () => {
    const response = await updateOrderStatusAction(order.id, OrderStatus.CANCELLED)
    
    if (response.success) {
      toast({
        title: "Заказ отменен",
        description: "Статус заказа успешно обновлен",
      })
      setOpen(false)
      router.refresh()
    } else {
      toast({
        title: "Ошибка",
        description: "Не удалось отменить заказ",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if(order.locationId){
      const fetchLocation = async () => {
        if(!order.locationId) {
          return
        }
        const location = await getLocationByIdAction(order.locationId)

        if(location.success && location.data){
          setOrderLocation(location.data)
        }
      }

      void fetchLocation()
    }
    if(order.restaurantId){
      const fetchLocation = async () => {
        if(!order.restaurantId) {
          return
        }
        const location = await getRestaurantLocationByIdAction(order.restaurantId)

        if(location.success && location.data){
          setOrderLocation(location.data)
        }
      }

      void fetchLocation()
    }
  }, [order.locationId, order.restaurantId])
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
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Детали заказа #{order.id.slice(0, 8)}</DialogTitle>
          <DialogDescription>
            Информация о вашем заказе
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Статус и сумма */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Статус:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" :
                  order.status === "PREPARING" ? "bg-blue-500/10 text-blue-500" :
                    order.status === "DELIVERY" ? "bg-purple-500/10 text-purple-500" :
                      order.status === "DELIVERED" ? "bg-green-500/10 text-green-500" :
                        order.status === "READY" ? "bg-green-500/10 text-green-500" :
                          order.status === "COMPLETED" ? "bg-green-500/10 text-green-500" :
                            "bg-red-500/10 text-red-500"
              }`}
              >
                {order.status === "PENDING" ? "Ожидается" :
                  order.status === "PREPARING" ? "Готовится" :
                    order.status === "DELIVERY" ? "В доставке" :
                      order.status === "DELIVERED" ? "Доставлен" :
                        order.status === "READY" ? "Готов" :
                          order.status === "COMPLETED" ? "Завершен" :
                            "Отменен"}
              </span>
            </div>
            <div className="text-lg font-semibold">
              {order.totalPrice ? order.totalPrice.toLocaleString('ru-RU') : totalPrice.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          {/* Информация о заказе */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Имя</p>
              <p>{order.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Телефон</p>
              <p>{order.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p>{order.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Способ оплаты</p>
              <p>{transformPayment(order.payment)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Способ получения</p>
              <p>{order.locationId ? "Доставка" : "Самовывоз"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Адрес получения</p>
              <p>{orderLocation?.address}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Способ оплаты</p>
              <p>{order.useBonuses ? "Списание бонусов" : "Начисление бонусов" } {order.bonuses} ₽</p>
            </div>
          </div>

          {/* Товары */}
          <div className="space-y-4">
            <h3 className="font-medium">Товары</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {order.items.map((item) => (
                <div className="flex items-center gap-4"
                  key={item.id}
                >
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-[#2a2a2a]">
                    {item.product.image ? (
                      <Image
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        height={64}
                        src={item.product.image}
                        width={64}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} шт. × {item.product.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <div className="font-medium">
                    {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Комментарий */}
          {order.comment && (
            <div>
              <h3 className="font-medium mb-2">Комментарий</h3>
              <p className="text-sm text-muted-foreground">{order.comment}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {order.status === "PENDING" && (
            <Button
              onClick={handleCancelOrder}
              variant="destructive"
            >
              Отменить заказ
            </Button>
          )}
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
