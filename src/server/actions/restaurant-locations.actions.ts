"use server"
import { type RawRestaurantPickupLocation, type Response, type RestaurantPickupLocation } from "@/types"

import { db } from "../db"

export const createRestaurantLocationAction = async (location: RawRestaurantPickupLocation): Promise<Response<RestaurantPickupLocation>> => {
  try {
    const createdLocation = await db.restaurantLocation.create({
      data: {
        ...location,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: createdLocation as RestaurantPickupLocation,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to create restaurant location",
    }
  }
}

export const getRestaurantLocationsAction = async (): Promise<Response<RestaurantPickupLocation[]>> => {
  try {
    const locations = await db.restaurantLocation.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return {
      success: true,
      data: locations as RestaurantPickupLocation[],
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to get restaurant locations",
    }
  }
}

export const updateRestaurantLocationAction = async (location: RestaurantPickupLocation): Promise<Response<RestaurantPickupLocation>> => {
  try {
    const updatedLocation = await db.restaurantLocation.update({
      where: { id: location.id },
      data: {
        ...location,
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: updatedLocation as RestaurantPickupLocation,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to update restaurant location",
    }
  }
}

export const deleteRestaurantLocationAction = async (id: string): Promise<Response<RestaurantPickupLocation>> => {
  try {
    await db.restaurantLocation.delete({
      where: { id },
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
      error: "Failed to delete restaurant location",
    }
  }
} 
export const getRestaurantLocationByIdAction = async (id: string): Promise<Response<RestaurantPickupLocation>> => {
  try {
    const location = await db.restaurantLocation.findUnique({
      where: { id },
    })

    return {
      success: true,
      data: location as RestaurantPickupLocation,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to get restaurant location by id",
    }
  }
}
