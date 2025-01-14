'use client'
import { Trash } from "lucide-react"
import { useState } from "react"

import { deleteProductAction } from "@/server/actions/products.actions"
import { type ProductWithCategory } from "@/types"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const DeleteProductModal = ({product}: {product: ProductWithCategory}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    await deleteProductAction(product.id)
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
          <DialogTitle>Вы действительно хотите удалить эту позицию?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Это действие необратимо и удалит эту позицию из меню.
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

export  {DeleteProductModal}
