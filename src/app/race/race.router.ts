import { Router } from "express";
import { atStrategy } from "../auth/strategies/at.strategy";
import { validateBody } from "../common";
import { createRaceSchema } from "./schemas/race.schema";
import { handleCreateRace, handleEnterRace, handleGetRaces } from "./race.controller";

const router = Router();

router.get("/race", handleGetRaces);
router.post(
  "/race",
  atStrategy,
  validateBody(createRaceSchema),
  handleCreateRace
);

router.post("/race/:code/enter", atStrategy, handleEnterRace);

export { router as raceRouter };
