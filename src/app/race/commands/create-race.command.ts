import { prisma } from "@/database";
import { createRaceSchema, type CreateRace } from "../schemas/race.schema";
import type { User } from "@prisma/client";

export const createRace = async (creator: User, dto: CreateRace) => {
  const joinCode = Math.random().toString(36).substring(2, 8);

  // we parse again to get the default valeus from schema
  const race = createRaceSchema.parse(dto);

  return await prisma.race.create({
    data: {
      joinCode: joinCode,
      name: race.name,
      joinUntil: race.joinUntil,
      startDate: race.startDate,
      creatorId: creator.id,
      checkPoints: {
        createMany: {
          data: race.checkPoints.map((checkpoint, i) => ({
            ...checkpoint,
            order: checkpoint.order ?? i,
            name: checkpoint.name || `checkpoint ${checkpoint.order ?? i}`,
            latitude: checkpoint.latitude ?? 0,
            longitude: checkpoint.longitude ?? 0,
          })),
        },
      },
    },
  });
};
