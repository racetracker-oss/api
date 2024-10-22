import type { Express } from "express";
import { authRouter } from "./app/auth/auth.router";

export function initRoutes(app: Express): void {
  app.use(authRouter);
}
