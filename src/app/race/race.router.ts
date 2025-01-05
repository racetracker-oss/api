import { Router } from "express";
import { atStrategy } from "../auth/strategies/at.strategy";
import { validateBody } from "../common";
import { createRaceSchema } from "./schemas/race.schema";
import {
  handleCreateRace,
  handleEnterRace,
  handleGetRaceParticipants,
  handleGetRaces,
  handleGetSingleRace,
  handleRaceDelete,
  handleRaceLeave,
} from "./race.controller";
import { rolesGuard } from "../auth/roles.guard";

const router = Router();

router.get("/race", handleGetRaces);
router.get("/race/:id", handleGetSingleRace);
router.get("/race/:id/participants", handleGetRaceParticipants);
router.post(
  "/race",
  atStrategy,
  rolesGuard(["race:create"]),
  validateBody(createRaceSchema),
  handleCreateRace
);
router.post("/race/:code/enter", atStrategy, handleEnterRace);
router.delete("/race/:code/leave", atStrategy, handleRaceLeave);
router.delete(
  "/race/:id",
  atStrategy,
  rolesGuard(["race:delete"]),
  handleRaceDelete
);

export { router as raceRouter };
