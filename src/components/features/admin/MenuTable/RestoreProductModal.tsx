'use client'
import { RotateCcw, Trash } from "lucide-react"
import { useState } from "react"

import { restoreProductAction } from "@/server/actions/products.actions"
import { type ProductWithCategory } from "@/types"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const RestoreProductModal = ({product}: {product: ProductWithCategory}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    await restoreProductAction(product.id)
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
          <DialogTitle>Вы действительно хотите вернуть эту позицию?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Это действие необратимо и вернет эту позицию в меню.
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

export  {RestoreProductModal}
