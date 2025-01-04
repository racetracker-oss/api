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
  handleRaceLeave,
} from "./race.controller";

const router = Router();

router.get("/race", handleGetRaces);
router.get("/race/:code", handleGetSingleRace);
router.get("/race/:code/participants", handleGetRaceParticipants);
router.post(
  "/race",
  atStrategy,
  validateBody(createRaceSchema),
  handleCreateRace
);
router.post("/race/:code/enter", atStrategy, handleEnterRace);
router.delete("/race/:code/leave", atStrategy, handleRaceLeave);

export { router as raceRouter };
