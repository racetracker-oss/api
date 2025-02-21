import { prisma } from "@/database";
import type { Request, Response } from "express";

interface HealthCheckResponse {
  database: "OK" | "ERROR";
  server: "OK" | "ERROR";
}

export const healthCheck = async (
  _: Request,
  res: Response<HealthCheckResponse>
) => {
  const database = await prisma.$queryRaw`SELECT 1`;
  res.json({
    database: database ? "OK" : "ERROR",
    server: "OK",
  });
};
