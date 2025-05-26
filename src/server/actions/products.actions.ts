'use server'

import { type ProductWithCategory, type Response } from "@/types";
import { type Prisma, type Product } from "@prisma/client";
import { type JsonValue } from "@prisma/client/runtime/library";

import { db } from "../db";
import { getCategoryByProductIdAction } from "./category.actions";

export const getAllProductsAction = async (): Promise<Response<ProductWithCategory[]>> => {
  try {
    const products = await db.product.findMany({where: {isDeleted: false}});
    const productsWithCategory = await Promise.all(products.map(async (product) => {
      const category = await getCategoryByProductIdAction(product.id)

      return { ...product, category }
    }))

    return {
      success: true,
      data: productsWithCategory as unknown as ProductWithCategory[],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Product not found",
    }
  }
}
export const getAllProductsWithDeletedAction = async (): Promise<Response<ProductWithCategory[]>> => {
  try {
    const products = await db.product.findMany({where: {isDeleted: true}});
    const productsWithCategory = await Promise.all(products.map(async (product) => {
      const category = await getCategoryByProductIdAction(product.id)

      return { ...product, category }
    }))

    return {
      success: true,
      data: productsWithCategory as unknown as ProductWithCategory[],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Product not found",
    }
  }
}
export const addProductAction = async (product: {
  name: string
  description: string
  gramm: number
  price: number
  categoryId: string
  isSpicy: boolean
  image: string
  nutrition?: JsonValue | null
}): Promise<Response<ProductWithCategory>> => {
  try {
    const newProduct = await db.product.create({
      data: {
        name: product.name,
        description: product.description,
        gramm: product.gramm,
        price: product.price,
        categoryId: product.categoryId,
        isSpicy: product.isSpicy,
        nutrition: product.nutrition ?? {},
        image: product.image ?? '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: newProduct as unknown as ProductWithCategory,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Product not found",
    }
  }
}
export const updateProductAction = async (product: Partial<Product>): Promise<Response<ProductWithCategory>> => {
  try {
    const updatedProduct = await db.product.update({
      where: { id: product.id },
      data: {
        ...product, 
        updatedAt: new Date(),
        nutrition: product.nutrition as Prisma.InputJsonValue,
      }
    })

    return {
      success: true,
      data: updatedProduct as unknown as ProductWithCategory,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Product not found",
    }
  }
}
export const deleteProductAction = async (productId: string): Promise<Response<null>> => {
  try {
    await db.product.update({
      where: { id: productId },
      data: { isDeleted: true, updatedAt: new Date() }
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
      error: "Product not found",
    }
  }
}
export const restoreProductAction = async (productId: string): Promise<Response<null>> => {
  try {
    await db.product.update({
      where: { id: productId },
      data: { isDeleted: false, updatedAt: new Date() }
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
      error: "Product not found",
    }
  }
}
