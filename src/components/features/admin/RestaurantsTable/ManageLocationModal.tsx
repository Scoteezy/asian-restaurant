'use client'
import { Check, ChevronsUpDown, Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createRestaurantLocationAction, updateRestaurantLocationAction } from "@/server/actions/restaurant-locations.actions"
import { type RawRestaurantPickupLocation, type RestaurantPickupLocation } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import z from "zod"

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Название должно содержать минимум 2 символа.",
  }),
  address: z.string().min(2, {
    message: "Адрес должен содержать минимум 2 символа.",
  }),
  workingHours: z.string().min(2, {
    message: "Часы работы должны содержать минимум 2 символа.",
  }),
  phone: z.string().min(2, {
    message: "Телефон должен содержать минимум 2 символа.",
  }),
  isActive: z.boolean().default(true),
})

const ManageLocationModal = ({ location}: { location?: RestaurantPickupLocation}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: location?.name ?? "",
      address: location?.address ?? "",
      workingHours: location?.workingHours ?? "",
      phone: location?.phone ?? "",
      isActive: location?.isActive ?? true,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (location) {
        await updateRestaurantLocationAction({
          id: location.id,
          ...values,
          createdAt: location.createdAt,
          updatedAt: new Date(),
        });
      } else {
        await createRestaurantLocationAction(values);
      }
        
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        {location ? (
          <Button variant="outline">
            <Pencil />
          </Button>
        ) : (
          <Button className="w-full"
            variant="outline"
          >
            Добавить локацию
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{location ? 'Редактировать локацию' : 'Добавить локацию'}</DialogTitle>
          <DialogDescription>
            {location ? 'Измените данные локации' : 'Добавьте новую локацию самовывоза'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Название ресторана"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="Адрес ресторана"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Часы работы</FormLabel>
                  <FormControl>
                    <Input placeholder="9:00 - 22:00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+7 (XXX) XXX-XX-XX"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      checked={field.value}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={field.onChange}
                      type="checkbox"
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">Активна</FormLabel>
                </FormItem>
              )}
            />
            <Button className="w-full"
              type="submit"
              variant="secondary"
            >
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { ManageLocationModal }
