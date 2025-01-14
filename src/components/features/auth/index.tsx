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

import { LoginForm } from "./LoginForm"
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

   
      </DialogContent>
    </Dialog>
  )
}

export { AuthModal };
