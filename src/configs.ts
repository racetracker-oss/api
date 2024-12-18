import type { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as bodyparser from "body-parser";
import morgan from "morgan";

export function initConfig(app: Express): void {
  app.use(cors({ origin: "*" }));
  app.use(cookieParser());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(morgan(":method :url :response-time ms"));
}
