import { prisma } from "@/database";
import { RaceNotFoundError } from "../../errors";

export const getRaceCheckpoints = async (code: string) => {
  const result = await prisma.checkPoint.findMany({
    where: {
      race: {
        joinCode: code,
      },
    },
  });

  if (!result) throw new RaceNotFoundError();

  return result;
};
