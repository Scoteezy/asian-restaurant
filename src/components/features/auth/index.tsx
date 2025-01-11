"use client"

import { UserIcon } from "lucide-react"
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

import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
function AuthModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full w-full"
          variant='secondary'
        > 
          <UserIcon height={18}
            size={18}
            width={18}
          /> Войти
        </Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Авторизация</DialogTitle>
          <DialogDescription>
            Войдите в свой аккаунт или зарегистрируйтесь
          </DialogDescription>
        </DialogHeader>
        <LoginForm />

        {/* <Tabs className="w-full"
          defaultValue="login"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger 
              value="register"
            >Регистрация
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs> */}
      </DialogContent>
    </Dialog>
  )
}

export { AuthModal };
