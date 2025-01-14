
'use server'
import { db } from "../db"
export const getCategoryByProductIdAction = async (productId: string) => {
  const category = await db.category.findFirst({
    where: {
      Product: {
        some: { id: productId }
      }
    }
  })

  return category
}

export const getAllCategoriesAction = async () => {
  const categories = await db.category.findMany()

  return categories
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
  const category = await db.category.delete({
    where: { id },
  })

  return category
}
