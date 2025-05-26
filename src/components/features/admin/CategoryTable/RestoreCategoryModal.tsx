'use client'
import { RotateCcw, Trash } from "lucide-react"
import { useState } from "react"

import { deleteCategoryAction } from "@/server/actions/category.actions"
import { type Category } from "@/types"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const RestoreCategoryModal = ({category}: {category: Category}) => {
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
          <RotateCcw />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы действительно хотите вернуть категорию?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Это действие необратимо и вернет категорию в меню.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}
            variant="outline"
          >Отмена
          </Button>
          <Button onClick={handleDelete}
            variant="destructive"
          >Вернуть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RestoreCategoryModal
