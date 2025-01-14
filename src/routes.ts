import type { Express } from "express";
import { authRouter } from "./app/auth/auth.router";
import { raceRouter } from "./app/race/race.router";
import { userRouter } from "./app/user/user.router";

export function initRoutes(app: Express): void {
  app.use(authRouter);
  app.use(raceRouter);
  app.use(userRouter);
}
