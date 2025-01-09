'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LogOutIcon } from "lucide-react"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useEffect } from "react"
import { updateUserAction } from "@/server/actions/user.actions"
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

const UserInfo = ({prefetchedUser}: {prefetchedUser: User}) => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  useEffect(() => {
    if (prefetchedUser) {
      form.reset({
        name: prefetchedUser.name ?? "",
        phone: prefetchedUser.phone ?? "",
        email: prefetchedUser.email ?? "",
      })
    }
  }, [prefetchedUser, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!prefetchedUser?.id) return
    
    await updateUserAction(prefetchedUser.id, {
      ...values,
      id: prefetchedUser.id,
    })

    toast({
      title: "Данные успешно обновлены",
      description: "Ваши данные были успешно обновлены",
    })
  }

  return (
    <div className="flex flex-col gap-2 p-3 border-2 border-secondary rounded-lg min-w-[300px]">
      <h1 className="text-2xl font-bold text-primary">Ваш профиль</h1>
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
                  <Input placeholder="example@example.com" {...field} readOnly/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" variant="secondary" className="w-full rounded-full">
              Сохранить
            </Button>
            <Button 
              type="button" 
              variant="default" 
              className="rounded-full w-full h-10 text-white bg-secondary hover:bg-secondary/80"
              onClick={() => signOut()}
            >
              <LogOutIcon size={18} height={18} width={18}/> Выйти
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { UserInfo }
