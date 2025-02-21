import { atStrategy } from "@/app/auth/strategies/at.strategy";
import { Router } from "express";
import {
  handleCreateCheckpoint,
  handleGetRaceCheckpoints,
} from "./checkpoint.controller";
import { rolesGuard } from "@/app/auth/roles.guard";

const router = Router();

router.get("/:raceId", atStrategy, handleGetRaceCheckpoints);
router.post(
  "/:raceId",
  atStrategy,
  rolesGuard(["checkpoint:create"]),
  handleCreateCheckpoint
);
export { router as checkPointRouter };
