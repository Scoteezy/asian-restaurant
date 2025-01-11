"use client"

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,

} from "@/components/ui/form"


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
    
      <div >
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
