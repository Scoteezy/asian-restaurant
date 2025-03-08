'use server'

import { type Favorite, type Response } from "@/types"

import { db } from "../db"
import { getUserAction } from "./user.actions"

export const getFavorites = async (): Promise<Response<Favorite[]>> => {
  try {
    const user = await getUserAction()

    if (!user.success || !user.data) {
      return {
        success: false,
        error: "User not found",
        data: null,
      }
    }

    const favorites = await db.favorite.findMany({
      where: {
        userId: user.data.id,
      },
      include: {product: {include: {}}}
    })

    return {
      success: true,
      error: null,
      data: favorites as unknown as Favorite[],
    }
  } catch (error) {
    return {
      success: false,
      error: "Error getting favorites",
      data: null,
    }
  }
}

export const addOrDeleteFavorite = async (productId: string): Promise<Response<null>> => {
  try {
    const user = await getUserAction()

    if (!user.success || !user.data) {
      return {
        success: false,
        error: "User not found",
        data: null,
      }
    }
    console.log(user.data.id, productId)
    const favorite = await db.favorite.findUnique({
      where: {
        userId: user.data.id,
        productId: productId,
      },
    })

    console.log(favorite)
    if (favorite) {
      await db.favorite.delete({
        where: {
          id: favorite.id,
        },
      })
    } else {
      await db.favorite.create({
        data: {
          userId: user.data.id,
          productId: productId,
        },
      })
    }

    return {
      success: true,
      error: null,
      data: null,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: "Error adding or deleting favorite",
      data: null,
    }
  }
}
