"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getUserAction, updateUserAction } from "@/server/actions/user.actions"
import { User } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа.",
  }),
  phone: z.string()
  .startsWith("+7", { message: "Номер телефона должен начинаться с +7" })
  .min(12, { message: "Введите корректный номер телефона." })
  .max(12, { message: "Введите корректный номер телефона." }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email.",
  }),
})



function UserDataModal() {
  const params = useSearchParams()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!user?.id){return}
    void updateUserAction(user.id, {
      ...values,
      id: user.id,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    toast({
      title: "Данные успешно обновлены",
      description: "Ваши данные были успешно обновлены",
    })
    setOpen(false)
  }
  
  useEffect(() => {
    getUserAction().then((user) => {
        setUser(user)
        if (user) {
            // Update form values when user data is loaded
            form.reset({
              name: user.name ?? "",
              phone: user.phone ?? "",
              email: user.email ?? "",
            })
          }
      if (!user?.name || !user?.phone || !user?.email && params.get('afterAuth') === 'true') {
        setOpen(true)
      }
    })
  }, [params])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Заполните личные данные</DialogTitle>
          <DialogDescription>
            Это поможет нам сделать ваш опыт использования сервиса лучше
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван" {...field} />
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
                    <Input placeholder="+7 (999) 999-99-99" {...field} />
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
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" className="w-full">
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { UserDataModal }
