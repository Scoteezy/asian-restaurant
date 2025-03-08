'use client'
import { HeartIcon } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"

import { toast } from "@/hooks/use-toast"
import { addOrDeleteFavorite, getFavorites } from "@/server/actions/favorite.actions"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
const AddFavoriteButton = ({ productId }: { productId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getFavorites()

      if (response.success && response.data) {
        setIsFavorite(response.data.some((favorite) => favorite.productId === productId))
      }
    }

    void fetchFavorites()
  }, [productId])
  const addFavorite = async () => {
    const response = await addOrDeleteFavorite(productId)

    if (response.success) {
      setIsFavorite(!isFavorite)
      toast({
        title: "Товар добавлен в избранное",
        description: "Вы можете удалить его из избранного в любой момент",
      })
      router.refresh()
    }else{
      toast({
        title: "Ошибка при добавлении в избранное",
        description: "Попробуйте позже",
      })
    }
  }

  return (
    <Button 
      className={`rounded-full bg-transparent ${isFavorite ? "bg-main text-white hover:bg-transparent hover:text-white" : "text-main hover:bg-main hover:text-white"}  
       border-main border  transition-all duration-700`}
      onClick={() => addFavorite()}
      size="icon"
    >
      <HeartIcon 
        className={`${isFavorite ? "fill-white hover:fill-none" : "fill-none hover:fill-white"}`}
        size={24}
      />
    </Button>
  )
}

export default AddFavoriteButton
