
'use server'

import { type Category, type CategoryWithProducts, type Response } from "@/types"

import { db } from "../db"
export const getCategoryByProductIdAction = async (productId: string): Promise<Response<CategoryWithProducts>> => {
  try {
    const category = await db.category.findFirst({
      where: {
        Product: {
          some: { id: productId }
        },
        isDeleted: false
      }
    })

    return {
      success: true,
      data: category as unknown as CategoryWithProducts,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Category not found",
    }
  }
}
export const getAllCategoriesAction = async (): Promise<Response<Category[]>> => {
  try {
    const categories = await db.category.findMany({where: {isDeleted: false}})

    return {
      success: true,
      data: categories as unknown as Category[],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Category not found",
    }
  }
}
export const getAllCategoriesWithProductsAction = async (): Promise<Response<CategoryWithProducts[]>> => {
  try {
    const categories = await db.category.findMany({where: {isDeleted: false}, include: {Product: {where: {isDeleted: false}}}})

    return {
      success: true,
      data: categories as unknown as CategoryWithProducts[],
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Category not found",
    }
  }
}
export const createCategoryAction = async (data: {
  name: string
  description: string
}): Promise<Response<CategoryWithProducts>> => {
  try {
    const category = await db.category.create({
      data: {
        name: data.name,
        description: data.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: category as unknown as CategoryWithProducts,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Category not found",
    }
  }
}
export const updateCategoryAction = async (id: string, data: {
  name: string
  description: string
}): Promise<Response<CategoryWithProducts>> => {
  try {
    const category = await db.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: category as unknown as CategoryWithProducts,
      error: null,
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Category not found",
    }
  }
}

export const deleteCategoryAction = async (id: string): Promise<Response<null>> => {
  try {
    await db.category.update({
      where: { id },
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
      error: "Category not found",
    }
  }
}
