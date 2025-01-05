import { prisma } from "@/database";
import type { User } from "@prisma/client";
import { CanNotJoinRaceError, RaceNotFoundError } from "../errors";

export const enterRace = async (user: User, raceCode: string) => {
  const today = new Date();
  const race = await prisma.race.findUnique({
    where: {
      joinCode: raceCode,
    },
  });

  if (!race) {
    throw new RaceNotFoundError();
  }

  if (today > race.joinUntil) {
    throw new CanNotJoinRaceError(
      "Can not join to the race. Reason: Race join time is over."
    );
  }

  if (today > race.startDate) {
    throw new CanNotJoinRaceError(
      "Can not join to the race. Reason: Race has already started."
    );
  }

  const isUserAlreadyInRace = await prisma.user.findFirst({
    where: {
      id: user.id,
      Race: {
        some: {
          joinCode: raceCode,
        },
      },
    },
  });

  if (isUserAlreadyInRace) {
    throw new CanNotJoinRaceError(
      "Can not join to the race. Reason: Already joined"
    );
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
