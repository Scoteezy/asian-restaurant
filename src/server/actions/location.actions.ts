"use server"
import { type Location, type RawLocation, type Response } from "@/types"

import { db } from "../db"
import { getUserAction } from "./user.actions"


export const createLocationAction = async (location: RawLocation): Promise<Response<Location>> => {
  try {
    const userResponse = await getUserAction()
    
    if (!userResponse.success || !userResponse.data) {
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }

    const createdLocation = await db.location.create({
      data: {
        ...location,
        userId: userResponse.data.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: createdLocation as Location,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to create location",
    }
  }
}

export const getUserLocationsAction = async (): Promise<Response<Location[]>> => {
  try {
    const userResponse = await getUserAction()

    if (!userResponse.success || !userResponse.data) {
      return {
        success: false,
        data: null,
        error: "User not found",
      }
    }

    const locations = await db.location.findMany({
      where: {
        userId: userResponse.data.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return {
      success: true,
      data: locations as Location[],
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to get locations",
    }
  }
}

export const updateLocationAction = async (location: Location): Promise<Response<Location>> => {
  try {
    const updatedLocation = await db.location.update({
      where: { id: location.id },
      data: {
        ...location,
        updatedAt: new Date(),
      },
    })

    return {
      success: true,
      data: updatedLocation as Location,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      data: null,
      error: "Failed to update location",
    }
  }
}


export const deleteLocationAction = async (id: string): Promise<Response<Location>> => {
  try {
    await db.location.delete({
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
      error: "Failed to delete location",
    }
  }
}
