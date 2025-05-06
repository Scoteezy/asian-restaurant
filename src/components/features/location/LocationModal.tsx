"use client"

import { ChevronDown, MapPin, Pencil, PlusIcon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { toast } from "@/hooks/use-toast"
import { createLocationAction, updateLocationAction } from "@/server/actions/location.actions"
import { type Location } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { z } from "zod"

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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const FormSchema = z.object({
  address: z.string().min(1, "Адрес обязателен"),
  isPrivate: z.boolean().default(false),
  entrance: z.string().optional(),
  doorCode: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  comment: z.string().optional(),
})

type AddressFormData = z.infer<typeof FormSchema>

function LocationModal({isEdit = false, address}: {isEdit?: boolean, address?: Location}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const form = useForm<AddressFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: address?.address ?? "",
      isPrivate: address?.isPrivate ?? true,
      entrance: address?.entrance ?? "",
      floor: address?.floor ?? "",
      apartment: address?.apartment ?? "",
      doorCode: address?.doorCode ?? "",
      comment: address?.comment ?? "",
    }
  })

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'isPrivate' && value.isPrivate) {
        form.setValue('entrance', '')
        form.setValue('doorCode', '')
        form.setValue('floor', '')
        form.setValue('apartment', '')
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  const isPrivate = form.watch('isPrivate')

  const onSubmit = async (data: AddressFormData) => {
    const response = isEdit ? await updateLocationAction({
      ...data,
      id: address?.id ?? "",
      userId: address?.userId ?? "",
      isPrivate: isPrivate,
      entrance: data.entrance ?? null,
      doorCode: data.doorCode ?? null,
      floor: data.floor ?? null,
      apartment: data.apartment ?? null,
      comment: data.comment ?? null,
    }) : await createLocationAction({
      ...data,
      isPrivate: isPrivate,
      entrance: data.entrance ?? null,
      doorCode: data.doorCode ?? null,
      floor: data.floor ?? null,
      apartment: data.apartment ?? null,
      comment: data.comment ?? null,
    })  

    if (response.success) {
      setOpen(false)
      form.reset()
      toast({
        title: "Адрес добавлен",
        description: "Адрес добавлен успешно",
      })
      router.refresh()
    } else {
      toast({
        title: "Ошибка",
        description: response.error,
      })
    }
  }

  return (
    <Dialog 
      onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        {isEdit ?  (
          <Button
            className="ml-auto"
            size="icon"
            variant="ghost"
          >
            <Pencil className="w-4 h-4" />
          </Button> 
        )
          : 
          (
            <Button className="rounded-full  text-white bg-secondary hover:bg-secondary/80"
              variant="default"
            > 
              <PlusIcon height={18}
                size={18}
                width={18}
              /> Добавить
            </Button>
          )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] sm:min-h-[400px] flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Nami</DialogTitle>
          <DialogDescription>
            {isEdit ? "Редактировать адрес" : "Добавить адрес доставки"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4 flex-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-8"
                        placeholder="Город, улица, дом"
                        {...field}
                      />
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setOpen(false)}
                        type="button"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <div className="relative flex">
                      <input
                        checked={field.value}
                        className="peer h-4 w-4 shrink-0 appearance-none rounded border border-gray-200 bg-white 
                        checked:border-primary checked:bg-primary hover:cursor-pointer hover:border-primary
                        focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => field.onChange(e.target.checked)}
                        type="checkbox"
                      />
                      <svg
                        className="pointer-events-none absolute h-4 w-4 opacity-0 peer-checked:opacity-100"
                        fill="none"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p className="ml-2 text-sm font-medium  select-none">
                        Частный дом
                      </p>
                    </div>
                  </FormControl>
                  
                </FormItem>
              )}
            />

            <div className={`grid grid-cols-2 gap-4 transition-opacity ${isPrivate ? 'opacity-50 pointer-events-none' : ''}`}>
              <FormField
                control={form.control}
                name="entrance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={isPrivate}
                        placeholder="Подъезд"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doorCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={isPrivate}
                        placeholder="Код двери"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-opacity ${isPrivate ? 'opacity-50 pointer-events-none' : ''}`}>
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={isPrivate}
                        placeholder="Этаж"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled={isPrivate}
                        placeholder="Квартира"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Комментарий"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          
            <Button 
              className="h-10 px-4 text-white mt-auto w-full bg-main hover:bg-main/90"
              type="submit"
              variant="default"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              <span className="font-medium">Сохранить</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { LocationModal };
