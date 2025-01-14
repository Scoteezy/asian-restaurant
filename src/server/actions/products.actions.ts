'use server'

import { type ProductWithCategory } from "@/types";
import { type Prisma, type Product } from "@prisma/client";
import { type JsonValue } from "@prisma/client/runtime/library";

import { db } from "../db";
import { getCategoryByProductIdAction } from "./category.actions";

export const getAllProductsAction = async () => {
  const products = await db.product.findMany({where: {isDeleted: false}});
  const productsWithCategory = await Promise.all(products.map(async (product) => {
    const category = await getCategoryByProductIdAction(product.id)

    return { ...product, category }
  }))

  return productsWithCategory as unknown as ProductWithCategory[];
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
}) => {
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

  return newProduct
}

export const updateProductAction = async (product: Partial<Product>) => {
  const updatedProduct = await db.product.update({
    where: { id: product.id },
    data: {
      ...product, 
      updatedAt: new Date(),
      nutrition: product.nutrition as Prisma.InputJsonValue,
    }
  })

  return updatedProduct
}

export const deleteProductAction = async (productId: string) => {
  await db.product.update({
    where: { id: productId },
    data: { isDeleted: true, updatedAt: new Date() }
  })
}
