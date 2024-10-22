import "express";
import type { JwtPayload } from "./types";
import type { envSchema } from "./env/env";
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
  namespace Express {
    interface User extends JwtPayload {}
  }
}
