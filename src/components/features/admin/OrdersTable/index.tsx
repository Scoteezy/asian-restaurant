import { Trash } from "lucide-react"

import { getUserAction, getUserByIdAction } from "@/server/actions/user.actions"
import { type OrderWithExtendedItems } from "@/types/Order"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import DeleteCategoryModal from "../CategoryTable/DeleteCategoryModal"
import EditCategoryModal from "../CategoryTable/EditCategoryModal"
import { CancelOrderModal } from "./DeleteOrderModal"
import EditOrderModal from "./EditOrderModal"
import { ExtendedOrderModal } from "./ExtendedOrderModal"



const OrdersTable = async ({orders}: {orders: OrderWithExtendedItems[]}) => {
  const formatStatus = (status: string) => {
    switch (status) {
      case "CANCELLED":
        return "Отменен"
      case "CONFIRMED":
        return "Подтвержден"
      case "DELIVERED":
        return "Доставлен"
      case "PENDING":
        return "Ожидает"
    }

  }

  return  (
    <div className="w-full">
      <Table>
        <TableCaption>Список всех заказов.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Номер заказа</TableHead>
            <TableHead className="w-[100px]">Имя</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Дата создания</TableHead>
            <TableHead>Дата обновления</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {

            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{order.updatedAt.toLocaleDateString()}</TableCell>
                <TableCell>{formatStatus(order.status)}</TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <ExtendedOrderModal order={order} />
                  <EditOrderModal order={order} />
                  <CancelOrderModal order={order} />
                </TableCell>
              </TableRow>
            )
          })}

        </TableBody>
       
      </Table>
    </div>
  )
}

export {OrdersTable}
