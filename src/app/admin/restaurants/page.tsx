import { Loader2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { getRestaurantLocationsAction } from "@/server/actions/restaurant-locations.actions";

import RestaurantsTable from "@/components/features/admin/RestaurantsTable";

export default async function RestaurantsPage() {
  const locations = await getRestaurantLocationsAction()


  if(!locations.success || !locations.data) {
    toast({
      title: "Ошибка при получении данных ресторанов",
      description: "Попробуйте позже",
    })
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 ">
      <RestaurantsTable locations={locations.data} />
    </div>
  )
}
