import { prisma } from "@/database";
import { RaceNotFoundError } from "../errors";
import type { Prisma, Race } from "@prisma/client";

type GetRaceOptions = {
  includeParticipants: boolean;
};

const byCode = async (
  code: string,
  filters?: GetRaceOptions
): Promise<Race> => {
  const include: Prisma.RaceInclude = {
    participants: filters?.includeParticipants && {
      select: {
        id: true,
        email: true,
      },
    },
  };

  const race = await prisma.race.findUnique({
    where: {
      joinCode: code,
    },
    include,
  });

  if (!race) throw new RaceNotFoundError();
  return race;
};

const byId = async (id: number): Promise<Race> => {
  const race = await prisma.race.findUnique({
    where: {
      id,
    },
  });

  if (!race) throw new RaceNotFoundError();

  return race;
};

export const getRace = {
  byCode,
  byId,
};
