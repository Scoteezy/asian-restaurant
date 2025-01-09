"use client"

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
      <form className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control} 
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com"
                  {...field}
                />
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
                <Input type="password"
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
        >Войти
        </Button>
      </form>
      <div className="mt-4">
        <Button className="w-full mb-2"
          onClick={handleGoogleSignIn}
          variant="outline"
        >
          Войти через Google
        </Button>
        <Button className="w-full"
          variant="outline"
        >
          Войти через VK
        </Button>
      </div>
    </Form>
  )
}

export { LoginForm };
