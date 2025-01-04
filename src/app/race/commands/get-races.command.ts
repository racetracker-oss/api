import { prisma } from "@/database";
import type { Prisma, Race } from "@prisma/client";

interface GetRacesCommand {
  races: Race[];
}

interface GetRacesFilter {
  active?: "ACTIVE" | "NOT_ACTIVE";
  orderBy?:
    | "DATE_ASC"
    | "DATE_DESC"
    | "PARTICIPANTS_COUNT_ASC"
    | "PARTICIPANTS_COUNT_DESC"
    | "NAME_ASC"
    | "NAME_DESC";
}

export const getRaces = async (
  filters?: GetRacesFilter
): Promise<GetRacesCommand> => {
  const where: Prisma.RaceWhereInput = {
    ...(filters?.active === "ACTIVE" && { startDate: { gte: new Date() } }),
    ...(filters?.active === "NOT_ACTIVE" && { startDate: { lt: new Date() } }),
  };

  const orderBy: Prisma.RaceOrderByWithRelationInput = {
    ...(filters?.orderBy === "DATE_ASC" && { startDate: "asc" }),
    ...(filters?.orderBy === "DATE_DESC" && { startDate: "desc" }),
    ...(filters?.orderBy === "PARTICIPANTS_COUNT_ASC" && {
      participants: { _count: "asc" },
    }),
    ...(filters?.orderBy === "PARTICIPANTS_COUNT_DESC" && {
      participants: { _count: "desc" },
    }),
    ...(filters?.orderBy === "NAME_ASC" && { name: "asc" }),
    ...(filters?.orderBy === "NAME_DESC" && { name: "desc" }),
  };

  const races = await prisma.race.findMany({
    where,
    orderBy,
    include: {
      participants: {
        select: {
          _count: true,
        },
      },
    },
  });

  return {
    races,
  };
};
