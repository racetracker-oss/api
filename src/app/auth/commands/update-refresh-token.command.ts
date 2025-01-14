import { prisma } from "@/database";
import type { User } from "@prisma/client";
import argon2 from "argon2";

export const updateRefreshToken = async (user: User, token: string) => {
  const hashedToken = await argon2.hash(token);

  return await prisma.user.update({
    data: { refreshToken: hashedToken },
    where: { id: user.id },
  });
};
