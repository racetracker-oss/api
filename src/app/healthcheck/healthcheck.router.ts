import { Router } from "express";
import { healthCheck } from "./healthcheck.controller";

const router = Router();

router.get("/healthcheck", healthCheck);

export { router as healthCheckRouter };
