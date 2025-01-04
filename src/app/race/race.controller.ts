import type { Request, Response } from "express";
import type { CreateRace } from "./schemas/race.schema";
import type { User } from "@prisma/client";
import {
  getRaces,
  createRace,
  deleteRace,
  enterRace,
  getRace,
  getRaceParticipants,
  handleLeaveRace,
} from "./commands";

export const handleGetRaces = async (req: Request, res: Response) => {
  const { query } = req;
  try {
    const result = await getRaces(query);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const handleGetSingleRace = async (
  req: Request<
    { code: string },
    unknown,
    unknown,
    { includeParticipants: string }
  >,
  res: Response
) => {
  const { code } = req.params;
  const { includeParticipants } = req.query;

  const options: { includeParticipants: boolean } = {
    includeParticipants:
      includeParticipants === "true" || includeParticipants === "1",
  };

  try {
    const result = await getRace.byCode(code, options);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const handleGetRaceParticipants = async (
  req: Request<{ code: string }>,
  res: Response
) => {
  const { code } = req.params;

  try {
    const result = await getRaceParticipants(code);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const handleCreateRace = async (
  req: Request<unknown, unknown, CreateRace>,
  res: Response
) => {
  const { user, body } = req;

  try {
    const result = await createRace(user as unknown as User, body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
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
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const handleRaceLeave = async (
  req: Request<{ code: string }, unknown, unknown>,
  res: Response
) => {
  const { code } = req.params;

  try {
    // @ts-ignore
    await handleLeaveRace(req.user, code);
    res.json({ message: "Left successfully." });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const handleRaceDelete = async (
  req: Request<{ id: string }, unknown, unknown>,
  res: Response
) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Missing id parameter." });
    return;
  }

  if (Number.isNaN(Number.parseInt(id))) {
    res.status(400).json({ message: "Invalid id parameter." });
    return;
  }

  try {
    await deleteRace(+id);
    res.json({ message: "Race successfully deleted." });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
