import { prisma } from "@/database";

export const getUsers = async () => {
  return await prisma.user.findMany({});
};
