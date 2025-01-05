import { prisma } from "@/database";

export const getUserRaces = async (userId: number) => {
  return await prisma.race.findMany({
    where: {
      creatorId: userId,
    },
  });
};
