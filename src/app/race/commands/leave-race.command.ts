import type { User } from "@prisma/client";
import { getRace } from "./get-race.command";
import { RaceNotFoundError } from "../errors";
import { prisma } from "@/database";

export const handleLeaveRace = async (user: User, code: string) => {
  const race = await getRace.byCode(code);
  if (!race) throw new RaceNotFoundError();

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
