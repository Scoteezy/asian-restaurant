"use client"

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
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать минимум 6 символов.",
  }),
})

function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  const handleGoogleSignIn = async () => {
    const result = await signIn('google', { 
      redirect: false,
      callbackUrl: `${window.location.origin}?afterAuth=true`
    })
    
    if (result?.error) {
      // Обработка ошибки
      console.error('Authentication error:', result.error)
    } else if (result?.ok) {
      // Успешная авторизация
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="w-full">Войти</Button>
      </form>
      <div className="mt-4">
        <Button variant="outline" className="w-full mb-2" onClick={handleGoogleSignIn}>
          Войти через Google
        </Button>
        <Button variant="outline" className="w-full">
          Войти через VK
        </Button>
      </div>
    </Form>
  )
}

export { LoginForm };
