"use server";

import { type Response } from "@/types";
import { type Role, type User } from "@prisma/client";

import { auth } from "../auth";
import { db } from "../db";
export const getUserAction = async (): Promise<Response<User>> => {
  try {
    const session = await auth();

    if (session) {
      const user = await db.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });

      return {
        success: true,
        data: user!,
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }
};
export const updateUserAction = async (id: string, data: Partial<User>): Promise<Response<User>> => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data,
    });

    return {
      success: true,
      data: user,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }
}
export const getUserByIdAction = async (id: string): Promise<Response<User>> => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return {
    success: true,
    data: user!,
    error: null,
  };
};
export const getAllUsersAction = async (): Promise<Response<User[]>> => {
  try {
    const users = await db.user.findMany();

    return {
      success: true,
      data: users,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }
};
export const updateUserRoleAction = async (id: string, role: Role): Promise<Response<User>> => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    return {
      success: true,
      data: user,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }
};
export const changeBonusesAction = async (id: string, bonuses: number, type: "add" | "subtract"): Promise<Response<null>> => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return {
      success: false,
      data: null,
      error: "User not found",
    };
  }
  await db.user.update({
    where: {
      id,
    },
    data: {
      bonuses: type === "add" ? user.bonuses + bonuses : user.bonuses - bonuses,
    },
  });

  return {
    success: true,
    data: null,
    error: null,
  };
};
