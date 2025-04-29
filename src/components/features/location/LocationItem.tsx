'use client'
import { MapPin, Trash } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { deleteLocationAction } from "@/server/actions/location.actions"
import { type Location } from "@/types"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { LocationModal } from "./LocationModal"
export const LocationItem = ({address}: {address: Location}) => {
  const router = useRouter()

  const handleDelete = async () => {
    const response = await deleteLocationAction(address.id)

    if (response.success) {
      toast({
        title: "Адрес удален",
      })
      router.refresh()
    }else{
      toast({
        title: "Ошибка при удалении адреса",
      })
    }
  }

  return (
    <div 
      className={`
  flex items-center justify-between gap-2 placeholder:text-muted-foreground 
  px-2 py-3 rounded-md bg-muted-foreground/10 border border-muted-foreground/20 transition-all duration-300 bg-primary text-white
`}
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-6 h-6"
          color="#fff"
          height={30}
          width={30}
        />
        <p className="text-md font-bold">{address.address}</p>
      </div>
      <div className="flex items-center self-end gap-2">
        <LocationModal address={address}
          isEdit={true}
        />
        <Button
          className="ml-auto"
          onClick={handleDelete}
          size="icon"
          variant="ghost"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
