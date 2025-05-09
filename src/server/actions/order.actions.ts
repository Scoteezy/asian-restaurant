'use server'
import { type CreateOrderInput, type Order, type Response } from "@/types"
import { type OrderWithExtendedItems } from "@/types/Order"
import { type OrderStatus } from "@prisma/client"

import { db } from "../db"
import { getUserAction } from "./user.actions"

export const createOrderAction = async (order: CreateOrderInput): Promise<Response<null>> => {
  try {
    const orderItems = order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))
    const products = await db.product.findMany({
      where: {
        id: { in: orderItems.map(item => item.productId) },
        isDeleted: false
      }
    })
    
    if (products.length !== orderItems.length) {
      return {
        success: false,
        data: null,
        error: "Some products do not exist or have been deleted"
      }
    }
    const user = await db.user.findUnique({
      where: { id: order.userId }
    })
    
    if (!user) {
      return {
        success: false,
        data: null,
        error: "User not found"
      }
    }
    await db.order.create({
      data: {
        ...order,
        items: { create: orderItems },
      },
    })
    
    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to create order",
    }
  }
}

export const getUserOrdersAction = async (): Promise<Response<OrderWithExtendedItems[]>> => {
  try {
    const user = await getUserAction()

    if(!user.success || !user.data){
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }
    const orders = await db.order.findMany({
      where: {
        userId: user.data.id,
      },
    })
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const items = await db.orderItem.findMany({
        where: {
          orderId: order.id,
        },
        include: {
          product: true
        }
      })

      return {
        ...order,
        items,
      }
    }))

    return {
      success: true,
      data: ordersWithItems,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to get orders",
    }
  }
}

export const updateOrderStatusAction = async (orderId: string, status: OrderStatus): Promise<Response<Order>> => {
  try {
    const user = await getUserAction()

    if(!user.success || !user.data){
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }

    const order = await db.order.findFirst({
      where: {
        id: orderId,
        userId: user.data.id,
      },
      include: {
        items: true,
      },
    })

    if (!order) {
      return {
        success: false,
        data: null,
        error: "Order not found",
      }
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: true,
      },
    })

    return {
      success: true,
      data: updatedOrder,
      error: null,
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    return {
      success: false,
      data: null,
      error: "Failed to update order status",
    }
  }
}
export const updateOrderAction = async (order:Order): Promise<Response<null>> => {
  try {
    const updatedOrder = await db.order.update({
      where: { id: order.id },
      data: {
        status: order.status as OrderStatus,
        comment: order.comment,
        name: order.name,
        phone: order.phone,
        email: order.email,
      },
    })

    return {
      success: true,
      data: null,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to update order",
    }
  }
}
export const getAllOrdersAction = async (): Promise<Response<OrderWithExtendedItems[]>> => {
  try {
    const orders = await db.order.findMany({
    })
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const items = await db.orderItem.findMany({
        where: {
          orderId: order.id,
        },
        include: {
          product: true
        }
      })

      return {
        ...order,
        items,
      }
    }))

    return {
      success: true,
      data: ordersWithItems,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to get orders",
    }
  }
}
