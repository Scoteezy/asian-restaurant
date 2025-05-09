"use client"
import { ScanEye } from "lucide-react"
import { useState } from "react"

import { type OrderWithExtendedItems } from "@/types/Order"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const ExtendedOrderModal = ({ order }: { order: OrderWithExtendedItems }) => {
  const [open, setOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size="sm"
          variant="outline"
        >
          <ScanEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Детали заказа #{order.id}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {/* Order Status and Date */}
            <div className="flex items-center justify-between">
              <Badge className={`${getStatusColor(order.status)} text-white`}>
                {order.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {format(new Date(order.createdAt), "d MMMM yyyy, HH:mm", { locale: ru })}
              </span>
            </div>

            {/* Customer Information */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Информация о клиенте</h3>
                <div className="space-y-2 text-sm">
                  <p>Имя: {order.name}</p>
                  <p>Телефон: {order.phone}</p>
                  <p>Email: {order.email}</p>
                  <p>Способ оплаты: {order.payment === "card" ? "Карта" : "Наличные"}</p>
                  <p>Способ доставки: {order.locationId ? "Доставка" : "Самовывоз"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-4">Товары в заказе</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.product.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.product.price} ₽</p>
                          <p className="text-sm text-muted-foreground">
                            Количество: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Подытог:</span>
                <span>{order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span>400 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>{order.useBonuses ? "Списание бонусов:" : "Начисление бонусов:"}</span>
                <span>{order.bonuses} ₽</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Итого:</span>
                <span>{order.totalPrice} ₽</span>
              </div>
            </div>

            {/* Additional Notes */}
            {order.comment && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Примечания к заказу</h3>
                  <p className="text-sm text-muted-foreground">{order.comment}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export { ExtendedOrderModal }
