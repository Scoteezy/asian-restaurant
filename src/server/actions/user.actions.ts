"use server";

import { type Role, type User } from "@prisma/client";

import { auth } from "../auth";
import { db } from "../db";

export const getUserAction = async () => {
  const session = await auth();

  if (session) {
    return await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
  }
  return null;
};
export const updateUserAction = async (id: string, data: Partial<User>) => {
  return await db.user.update({
    where: {
      id,
    },
    data,
  });
};
export const getUserByIdAction = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};
export const getAllUsersAction = async () => {
  return await db.user.findMany();
};

export const updateUserRoleAction = async (id: string, role: Role) => {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
};
