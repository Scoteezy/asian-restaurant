'use server'

import { db } from "@/server/db"
import { subDays } from "date-fns"

export async function getAnalyticsAction() {
  try {
    const today = new Date()
    const thirtyDaysAgo = subDays(today, 30)

    const deliveredOrders = await db.order.findMany({
      where: {
        status: "COMPLETED",
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    const totalRevenue = deliveredOrders.reduce((sum, order) => {
      const orderTotal = order.items.reduce((orderSum, item) => {
        return orderSum + (item.product.price * item.quantity)
      }, 0)

      return sum + orderTotal
    }, 0)

    const totalOrders = await db.order.count()

    const totalUsers = await db.user.count()

    const activeOrders = await db.order.count({
      where: {
        status: {
          in: ["PENDING", "DELIVERY", "PREPARING", "READY"],
        },
      },
    })

    const ordersByDate = await db.order.findMany({
      where: {
        status: "COMPLETED",
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const revenueData = ordersByDate.map(order => ({
      date: order.createdAt,
      revenue: order.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    }))

    const popularProducts = await db.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    })

    const popularProductsDetails = await Promise.all(
      popularProducts.map(async (product) => {
        const productDetails = await db.product.findUnique({
          where: { id: product.productId },
        })

        return {
          id: product.productId,
          name: productDetails?.name ?? 'Неизвестный продукт',
          orders: product._sum.quantity ?? 0,
          revenue: (productDetails?.price ?? 0) * (product._sum.quantity ?? 0),
        }
      })
    )

    const orderStatusStats = await db.order.groupBy({
      by: ['status'],
      _count: true,
    })

    return {
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalUsers,
        activeOrders,
        revenueData,
        popularProducts: popularProductsDetails,
        orderStatusStats: orderStatusStats.reduce((acc, stat) => ({
          ...acc,
          [stat.status]: stat._count,
        }), {}),
      }
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return {
      success: false,
      error: 'Failed to fetch analytics data'
    }
  }
}
