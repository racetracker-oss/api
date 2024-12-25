import { prisma } from "@/database";

export const getUserByEmail = async (email: string) =>
  await prisma.user.findFirst({ where: { email } });
