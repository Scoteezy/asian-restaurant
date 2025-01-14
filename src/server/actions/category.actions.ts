
'use server'

import { type CategoryWithProducts } from "@/types"

import { db } from "../db"
export const getCategoryByProductIdAction = async (productId: string) => {
  const category = await db.category.findFirst({
    where: {
      Product: {
        some: { id: productId }
      },
      isDeleted: false
    }
  })

  return category
}

export const getAllCategoriesAction = async () => {
  const categories = await db.category.findMany({where: {isDeleted: false}})

  return categories
}
export const getAllCategoriesWithProductsAction = async () => {
  const categories = await db.category.findMany({where: {isDeleted: false}, include: {Product: true}})

  return categories as unknown as CategoryWithProducts[]
}
export const createCategoryAction = async (data: {
  name: string
  description: string
}) => {
  const category = await db.category.create({
    data: {
      name: data.name,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  return category
}

export const updateCategoryAction = async (id: string, data: {
  name: string
  description: string
}) => {
  const category = await db.category.update({
    where: { id },
    data:{
      name: data.name,
      description: data.description,
      updatedAt: new Date(),
    },
  })

  return category
}

export const deleteCategoryAction = async (id: string) => {
  const category = await db.category.update({
    where: { id },
    data: { isDeleted: true, updatedAt: new Date() }
  })

  return category
}
