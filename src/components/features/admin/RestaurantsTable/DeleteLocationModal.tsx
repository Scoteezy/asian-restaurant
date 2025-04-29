'use client'
import { Trash } from "lucide-react"
import { useState } from "react"

import { deleteRestaurantLocationAction } from "@/server/actions/restaurant-locations.actions"
import { type RestaurantPickupLocation } from "@/types"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const DeleteLocationModal = ({location}: {location: RestaurantPickupLocation}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    await deleteRestaurantLocationAction(location.id)
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы действительно хотите удалить этот ресторан?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Это действие необратимо и удалит этот ресторан из списка.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}
            variant="outline"
          >Отмена
          </Button>
          <Button onClick={handleDelete}
            variant="destructive"
          >Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export  {DeleteLocationModal}
