import type { User } from "@prisma/client";
import { getRace } from "./get-race.command";
import { CanNotLeaveRaceError, RaceNotFoundError } from "../errors";
import { prisma } from "@/database";

export const handleLeaveRace = async (user: User, code: string) => {
  const race = await getRace.byCode(code);
  if (!race) throw new RaceNotFoundError();

  const isUserAlreadyInRace = await prisma.user.findFirst({
    where: {
      id: user.id,
      Race: {
        some: {
          joinCode: code,
        },
      },
    },
  });

  if (!isUserAlreadyInRace) {
    throw new CanNotLeaveRaceError(
      "Can not leave the race. Reason: Not joined"
    );
  }

  const leaveRace = await prisma.user.update({
    where: { id: user.id },
    data: {
      Race: {
        disconnect: {
          joinCode: code,
        },
      },
    },
  });

  return leaveRace;
};
