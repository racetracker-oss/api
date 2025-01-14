import { prisma } from "@/database";

export const deleteMe = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
