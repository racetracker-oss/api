import { prisma } from "@/database";
import type { Request, Response } from "express";

export const healthCheck = async (_: Request, res: Response) => {
  const database = await prisma.$queryRaw`SELECT 1`;
  res.status(200).send(`DATABASE: ${database ? "OK" : "ERROR"} SERVER:OK`);
};
