'use client'
import { Trash } from "lucide-react"
import { useState } from "react"

import { deleteCategoryAction } from "@/server/actions/category.actions"
import { type Category } from "@prisma/client"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const DeleteCategoryModal = ({category}: {category: Category}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    await deleteCategoryAction(category.id)
    router.refresh()
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы действительно хотите удалить категорию?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Это действие необратимо и удалит все позиции меню, относящиеся к этой категории.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}
            variant="outline"
          >Отмена
          </Button>
          <Button onClick={handleDelete}
            variant="destructive"
          >Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCategoryModal
