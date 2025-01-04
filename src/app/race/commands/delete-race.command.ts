import { prisma } from "@/database";
import { RaceNotFoundError } from "../errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const deleteRace = async (raceId: number) => {
  try {
    const result = await prisma.race.delete({
      where: {
        id: raceId,
      },
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
