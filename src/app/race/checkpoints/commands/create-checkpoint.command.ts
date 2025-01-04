import { prisma } from "@/database";
import type { CreateCheckpoint } from "../schemas/checkpoint.schema";

export const createCheckpoint = async (
  raceId: number,
  dto: CreateCheckpoint
) => {
  return await prisma.checkPoint.create({
    data: {
      latitude: dto.latitude,
      longitude: dto.longitude,
      name: dto.name,
      order: dto.order,
      raceId: raceId,
    },
  });
};
