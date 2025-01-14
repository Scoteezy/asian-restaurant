'use server'

import { type ProductWithCategory } from "@/types";
import { type Product } from "@prisma/client";

import { db } from "../db";
import { getCategoryByProductIdAction } from "./category.actions";

export const getAllProductsAction = async () => {
  const products = await db.product.findMany();
  const productsWithCategory = await Promise.all(products.map(async (product) => {
    const category = await getCategoryByProductIdAction(product.id)

    return { ...product, category }
  }))

  return productsWithCategory as ProductWithCategory[];
}

export const addProductAction = async (product: {
  name: string
  description: string
  price: number
  categoryId: string
  isSpicy: boolean
  image: string
}) => {
  const newProduct = await db.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      isCpicy: product.isSpicy,
      image: product.image ?? '',
    },
  })

  return newProduct
}
