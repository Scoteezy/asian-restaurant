'use client'
import { XCircle } from "lucide-react"
import { useState } from "react"

import { toast } from "@/hooks/use-toast"
import { updateOrderAction } from "@/server/actions/order.actions"
import { type OrderWithExtendedItems } from "@/types/Order"
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

const CancelOrderModal = ({ order }: { order: OrderWithExtendedItems }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    const response = await updateOrderAction({
      ...order,
      status: "CANCELLED",
    })

    if (response.success) {
      toast({
        title: "Заказ отменен",
        description: "Статус заказа успешно изменен на 'Отменен'",
      })
      router.refresh()
      setOpen(false)
    }
    if (response.error) {
      toast({
        title: "Ошибка при отмене заказа",
        description: response.error,
      })
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
          <XCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отменить заказ #{order.id}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Вы уверены, что хотите отменить этот заказ? Это действие изменит статус заказа на &quot;Отменен&quot;.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}
            variant="outline"
          >
            Нет, оставить
          </Button>
          <Button onClick={handleCancel}
            variant="destructive"
          >
            Да, отменить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CancelOrderModal }
