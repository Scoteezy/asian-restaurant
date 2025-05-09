'use client'
import { Check, ChevronsUpDown, Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { toast } from "@/hooks/use-toast"
import { updateOrderAction } from "@/server/actions/order.actions"
import { changeBonusesAction } from "@/server/actions/user.actions"
import { type OrderWithExtendedItems } from "@/types/Order"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа.",
  }),
  phone: z.string().min(10, {
    message: "Номер телефона должен содержать минимум 10 символов.",
  }),
  email: z.string().email({
    message: "Введите корректный email адрес.",
  }),
  status: z.enum(["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"]),
  comment: z.string().optional(),
})

const orderStatusValues = [
  {
    value: "PENDING",
    label: "Ожидает",
  },
  {
    value: "CONFIRMED",
    label: "Подтвержден",
  },
  {
    value: "DELIVERED",
    label: "Доставлен",
  },
  {
    value: "CANCELLED",
    label: "Отменен",
  },
]

const EditOrderModal = ({ order }: { order: OrderWithExtendedItems }) => {
  const [open, setOpen] = useState(false)
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: order.name,
      phone: order.phone,
      email: order.email,
      status: order.status as "CANCELLED" | "CONFIRMED" | "DELIVERED" | "PENDING",
      comment: order.comment ?? "",
    },
  })
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    const response = await updateOrderAction({
      ...order,
      ...data,
    })

    if(data.status==='DELIVERED'){
      if(order.useBonuses){
        await changeBonusesAction(order.userId, order.bonuses, "subtract")
  
      
      }else{
        await changeBonusesAction(order.userId, order.bonuses, "add")
      }
    }
    if (response.success) {
      form.reset({
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: data.status,
        comment: data.comment,
      })
      toast({
        title: "Заказ обновлен",
        description: "Заказ успешно обновлен",
      })
      router.refresh()
      setOpen(false)

    }
    if (response.error) {
      toast({
        title: "Ошибка при обновлении заказа",
        description: response.error,
      })
    }
  }

  const handleStatusSelect = (value: string) => {
    form.setValue('status', value as "CANCELLED" | "CONFIRMED" | "DELIVERED" | "PENDING")
    setStatusPopoverOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button size="sm"
          variant="outline"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать заказ #{order.id}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Измените информацию о заказе
        </DialogDescription>
        <Form {...form}>
          <form className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя клиента</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван Иванов"
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
                    <Input placeholder="+7 (999) 999-99-99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="client@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full">
              <p className="text-sm font-medium leading-none mb-2">Статус заказа</p>
              <Popover onOpenChange={setStatusPopoverOpen}
                open={statusPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    aria-expanded={statusPopoverOpen}
                    className="w-full justify-between"
                    role="combobox"
                    variant="outline"
                  >
                    {form.getValues('status')
                      ? orderStatusValues.find((status) => status.value === form.getValues('status'))?.label
                      : "Выберите статус..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start"
                  className="w-full p-0"
                  style={{ width: 'var(--radix-popover-trigger-width)' }}
                >
                  <Command className="w-full">
                    <CommandInput placeholder="Поиск статуса..." />
                    <CommandList>
                      <CommandEmpty>Нет такого статуса.</CommandEmpty>
                      <CommandGroup>
                        {orderStatusValues.map((status) => (
                          <CommandItem
                            key={status.value}
                            onSelect={() => handleStatusSelect(status.value)}
                            value={status.value}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                form.getValues('status') === status.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {status.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий к заказу</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-[250px]"
                      placeholder="Дополнительная информация о заказе"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full"
              type="submit"
              variant="secondary"
            >
              Сохранить изменения
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditOrderModal
