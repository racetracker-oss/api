import { prisma } from "@/database";
import type { Request } from "express";

export const healthCheck = async (_: Request, res) => {
  const database = await prisma.$queryRaw`SELECT 1`;
  if (!database) res.status(500).send("NOT OK");
};
