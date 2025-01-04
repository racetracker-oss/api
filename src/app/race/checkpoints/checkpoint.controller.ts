import type { Request, Response } from "express";
import { getRaceCheckpoints } from "./commands/get-race-checkpoints.command";
import type { CreateCheckpoint } from "./schemas/checkpoint.schema";
import { createCheckpoint } from "./commands/create-checkpoint.command";

export const handleGetRaceCheckpoints = async (
  req: Request<{ raceId: string }>,
  res: Response
) => {
  const { raceId } = req.params;

  try {
    const result = await getRaceCheckpoints(raceId);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const handleCreateCheckpoint = async (
  req: Request<{ raceId: string }, unknown, CreateCheckpoint>,
  res: Response
) => {
  const { raceId } = req.params;

  if (!raceId) {
    res.status(400).json({ message: "Race ID is required" });
  }

  try {
    const result = await createCheckpoint(+raceId, req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
