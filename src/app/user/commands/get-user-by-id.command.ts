import { prisma } from "@/database";
import { UserNotFoundError } from "../errors";

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    throw new UserNotFoundError();
  }

  return user;
};
