import { Loader2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { getAllOrdersAction } from "@/server/actions/order.actions";

import {OrdersTable} from "@/components/features/admin/OrdersTable";

export default async function OrdersPage() {
  const orders = await getAllOrdersAction();

  console.log(orders);
  if (!orders.success || !orders.data) {
    toast({
      title: "Ошибка при получении данных заказов",
      description: "Попробуйте позже",
    });
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <OrdersTable orders={orders.data} />
    </div>
  );
}
