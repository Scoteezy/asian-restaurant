
import { toast } from "@/hooks/use-toast"
import { getUserLocationsAction } from "@/server/actions/location.actions"

import { LocationItem } from "./LocationItem"
export const LocationList = async () => {
  const addresses = await getUserLocationsAction()

  if (!addresses.success) {
    toast({
      title: "Ошибка при получении адресов",
    })
    return <div>Error</div>
  }
  if(addresses.data?.length === 0) {
    return (
      <div className="flex flex-col gap-4 mt-4 h-full h-[270px]"> 
        <p className="text-sm text-gray-500 flex items-center">Тут пока что ничего нет.</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 mt-4 h-[270px] overflow-y-auto"> 
      {addresses.data?.map((address) => (
        <LocationItem address={address}
          key={address.id}
        />
      ))}
   
    </div>
  )
}
