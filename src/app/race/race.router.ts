import { Router } from "express";
import { atStrategy } from "../auth/strategies/at.strategy";
import { zValidator } from "../common";
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
import { z } from "zod";

const router = Router();

router.get(
  "/race",
  zValidator(
    "query",
    z.object({
      active: z.enum(["ACTIVE", "NOT_ACTIVE"]),
      orderBy: z.enum([
        "DATE_ASC",
        "DATE_DESC",
        "PARTICIPANTS_COUNT_ASC",
        "PARTICIPANTS_COUNT_DESC",
        "NAME_ASC",
        "NAME_DESC",
      ]),
    })
  ),
  handleGetRaces
);
router.get(
  "/race/:id",
  zValidator(
    "params",
    z.object({
      id: z.coerce.number(),
    })
  ),
  handleGetSingleRace
);

router.get(
  "/race/:id/participants",
  zValidator(
    "params",
    z.object({
      id: z.coerce.number(),
    })
  ),
  handleGetRaceParticipants
);
router.post(
  "/race",
  atStrategy,
  rolesGuard(["race:create"]),
  zValidator("body", createRaceSchema),
  handleCreateRace
);
router.post(
  "/race/:code/enter",
  atStrategy,
  zValidator(
    "params",
    z.object({
      code: z.string().min(1),
    })
  ),
  handleEnterRace
);
router.delete(
  "/race/:code/leave",
  atStrategy,
  zValidator(
    "params",
    z.object({
      code: z.string().min(1),
    })
  ),
  handleRaceLeave
);
router.delete(
  "/race/:id",
  atStrategy,
  rolesGuard(["race:delete"]),
  zValidator(
    "params",
    z.object({
      id: z.coerce.number(),
    })
  ),
  handleRaceDelete
);

export { router as raceRouter };
