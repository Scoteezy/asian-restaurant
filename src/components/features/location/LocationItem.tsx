'use client'
import { MapPin, Trash } from "lucide-react"

import { toast } from "@/hooks/use-toast"
import { deleteLocationAction } from "@/server/actions/location.actions"
import { type Location } from "@/types"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { LocationModal } from "./LocationModal"
export const LocationItem = ({address, setActive, selectedAddress, isEdit = true}: 
  {address: Location, setActive?: (active: string) => void, selectedAddress?: null | {id: string, type: "delivery" | "selfPickup"}, isEdit?: boolean}) => {
  const router = useRouter()

  const handleDelete = async () => {
    const response = await deleteLocationAction(address.id)

    if (response.success) {
      toast({
        title: "Адрес удален",
      })
      router.refresh()
    } else {
      toast({
        title: "Ошибка при удалении адреса",
      })
    }
  }

  return (
    <div 
      className={`
  flex items-center justify-between gap-2 placeholder:text-muted-foreground 
  px-2 py-3 rounded-md  border  transition-all duration-300  text-white
  ${selectedAddress?.id === address.id ? "bg-primary text-white border-main" : "bg-muted-foreground/10 border-muted-foreground/20"}
`}
      onClick={() => setActive?.(address.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setActive?.(address.id)
        }
      }}
      role="button"
      tabIndex={0}
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
        {isEdit && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
