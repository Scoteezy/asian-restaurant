'use server'

import { type BasketWithItems, type Response } from "@/types"
import { revalidatePath } from "next/cache"

import { db } from "../db"
import { getUserAction } from "./user.actions"

export const getBasket = async (): Promise<Response<BasketWithItems>> => {
  
  try {
    const user = await getUserAction()

    if (!user.success || !user.data) {
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }
    const basket = await db.basket.findUnique({
      where: {
        userId: user.data.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return {
      success: true,
      data: basket as BasketWithItems,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Basket not found",
    }
  }
}
export const addToBasket = async (productId: string): Promise<Response<null>> => {
  try {
    const user = await getUserAction()

    if (!user.success || !user.data) {
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }
    let basket = await db.basket.findUnique({
      where: {
        userId: user.data.id,
      },
    })

    if (!basket) {
      basket = await db.basket.create({
        data: {
          userId: user.data.id,
        },
      })
    }

    const existingItem = await db.basketItem.findFirst({
      where: {
        basketId: basket.id,
        productId: productId,
      },
    });
  
    if (existingItem) {
      await db.basketItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    } else {
      await db.basketItem.create({
        data: {
          basketId: basket.id,
          productId,
          quantity: 1,
        },
      });
    }
    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Basket not found",
    }
  }
}
export const deleteFromBasket = async (productId: string): Promise<Response<null>> => {
  try {
    const user = await getUserAction()

    if (!user.success || !user.data) {
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }
    const basket = await db.basket.findUnique({
      where: {
        userId: user.data.id,
      },
    })

    if (!basket) {
      return {
        success: false,
        data: null,
        error: "Basket not found",
      }
    }
    const existingItem = await db.basketItem.findFirst({
      where: {
        basketId: basket.id,
        id: productId,
      },
    })

    console.log('basketId', basket.id)
    console.log('productId', productId)
    console.log('existingItem', existingItem)
    if (!existingItem) {
      return {
        success: false,
        data: null,
        error: "Item not found",
      }
    }
    if (existingItem.quantity === 1) {
      await db.basketItem.delete({
        where: { id: existingItem.id },
      })
    } else {
      await db.basketItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity - 1 },
      })
    }

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Basket not found",
    }
  }
}


export const clearBasket = async (): Promise<Response<null>> => {
  try {
    const user = await getUserAction()

    if (!user.success || !user.data) {
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }
    await db.basket.deleteMany({
      where: {
        userId: user.data.id,
      },
    })

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Basket not found",
    }
  }
}
