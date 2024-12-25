import "express";
import type { envSchema } from "./env/env";
import type { User as PrismaUser } from "@prisma/client";
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
  namespace Express {
    interface User extends PrismaUser {}
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {};
