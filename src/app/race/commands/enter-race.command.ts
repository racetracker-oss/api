import { prisma } from "@/database";
import type { User } from "@prisma/client";
import { RaceNotFoundError } from "../errors";

export const enterRace = async (user: User, raceCode: string) => {
  const race = await prisma.race.findUnique({
    where: {
      joinCode: raceCode,
    },
    select: {
      id: true,
    },
  });

  if (!race) {
    throw new RaceNotFoundError();
  }

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      Race: {
        connect: {
          id: race.id,
        },
      },
    },
  });
};
