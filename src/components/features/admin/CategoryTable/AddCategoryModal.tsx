'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createCategoryAction } from "@/server/actions/category.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import z from "zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  description: z.string().min(2, {
    message: "Описание должно содержать минимум 2 символа.",
  }),
})
  
  
const AddCategoryModal = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createCategoryAction(data)
    form.reset()
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button className="w-full"
          variant="outline"
        >Добавить категорию
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить категорию</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Добавьте новую категорию в меню
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
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Вок"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea className="max-h-[250px]"
                      placeholder="Блюда азиатской кухни"
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
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryModal
