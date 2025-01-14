import { prisma } from "@/database";
import type { UpdateUser } from "../schemas";
import argon2 from "argon2";
import { getUserById } from "./get-user-by-id.command";
import { UserNotFoundError } from "../errors";
import { InvalidCredentialsError } from "@/app/auth/errors/invalid-credentials.error";
import type { User } from "@prisma/client";

export const updateMe = async (currentUser: User, dto: UpdateUser) => {
  if (Object.keys(dto).length === 0) {
    return currentUser;
  }

  const currentPassword = await argon2.hash(dto.currentPassword);
  const user = await getUserById(currentUser.id);
  if (!user) throw new UserNotFoundError();

  const isValidPassword = await argon2.verify(user.password, currentPassword);
  if (!isValidPassword) {
    throw new InvalidCredentialsError("Password is incorrect");
  }

  const hashedPassword = dto.password
    ? await argon2.hash(dto.password)
    : user.password;

  return await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      ...dto,
      password: hashedPassword,
    },
  });
};
