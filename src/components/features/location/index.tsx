"use client"

import { ChevronDown, MapPin, PlusIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { DeliveryForm } from "./DeliveryForm"
import { SelfPickupForm } from "./SelfPickUpForm"

function LocationModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <button className="flex gap-1 items-center">
          <MapPin className="w-6 h-6"
            color="#fff"
            height={30}
            width={30}
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="text-sm">Адрес доставки или самовывоз</p>
              <ChevronDown
                className="w-4 h-4" 
                color="#fff" 
                height={20}
                width={20}
              />
            </div>
            <p className="text-xs self-start text-muted-foreground">Выберите где получить заказ</p>
          </div>
        </button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[400px] flex flex-col self-start gap-4">
        <DialogHeader>
          <DialogTitle>A-Food</DialogTitle>
          <DialogDescription>
            Выберите адрес доставки или самовывоз
          </DialogDescription>
        </DialogHeader>
        <Tabs 
          className="w-full"
          defaultValue="selfPickup"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="selfPickup">Самовывоз</TabsTrigger>
            <TabsTrigger 
              value="delivery"
            >
              Доставка
            </TabsTrigger>
          </TabsList>
          <TabsContent value="selfPickup">
            <SelfPickupForm />
          </TabsContent>
          <TabsContent value="delivery">
            <DeliveryForm />
          </TabsContent>
        </Tabs>
        <Button className="rounded-full w-full h-10 mt-auto"
          variant="outline"
        >
          <PlusIcon
            className="w-6 h-6"
          />
          <p className="text-md font-bold">Выбрать</p>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export { LocationModal };
