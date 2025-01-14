import { prisma } from "@/database";
import type { AdminUpdateUser } from "../schemas";
import argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserNotFoundError } from "../errors";
import { getUserById } from "./get-user-by-id.command";

export const updateUser = async (userId: number, data: AdminUpdateUser) => {
  try {
    const user = await getUserById(userId);
    const userPassword = data.password
      ? await argon2.hash(data.password)
      : user.password;

    const result = await prisma.user.update({
      data: {
        ...user,
        ...data,
        password: userPassword,
      },
      where: {
        id: userId,
      },
    });
    return result;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new UserNotFoundError();
      }
    }
  }
};
