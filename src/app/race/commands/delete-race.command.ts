import { prisma } from "@/database";
import { RaceNotFoundError } from "../errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Prisma, User } from "@prisma/client";

export const deleteRace = async (user: User, raceId: number) => {
  const where: Prisma.RaceWhereUniqueInput = {
    id: raceId,
    ...(user.role === "ADMIN" ? {} : { creatorId: user.id }),
  };

  try {
    const result = await prisma.race.delete({
      where,
    });
    return result;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new RaceNotFoundError();
      }
    }
    throw e;
  }
};
