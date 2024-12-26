import type { Request, Response } from "express";
import type { CreateRace } from "./schemas/race.schema";
import { createRace } from "./commands/create-race.command";
import type { User } from "@prisma/client";
import { enterRace } from "./commands/enter-race.command";
import { RaceNotFoundError } from "./errors";
import { getRaces } from "./commands/get-races.command";

export const handleGetRaces = async (req: Request, res: Response) => {
  const { query } = req;
  try {
    const result = await getRaces(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleCreateRace = async (
  req: Request<unknown, unknown, CreateRace>,
  res: Response
) => {
  const { user, body } = req;

  try {
    const result = await createRace(user as unknown as User, body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleEnterRace = async (
  req: Request<{ code: string }, unknown, unknown>,
  res: Response
) => {
  const { code } = req.params;

  try {
    // @ts-ignore
    await enterRace(req.user, code);
    res.json({ message: "Joined successfully." });
  } catch (e) {
    if (e instanceof RaceNotFoundError) {
      res.status(e.status).json({ message: e.message });
    }
    res.status(500).json({ message: e.message });
  }
};
