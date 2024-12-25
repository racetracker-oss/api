import { prisma } from "@/database";

export const getUserById = async (userId: number) =>
  await prisma.user.findFirst({ where: { id: userId } });
