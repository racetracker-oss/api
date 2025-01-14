import type { Request, Response } from "express";
import { getUserById, getUsers, updateMe } from "./commands";
import type { UpdateUser } from "./schemas";
import { deleteMe } from "./commands/delete-me.command";

export const handleGetUsers = async (_: Request, res: Response) => {
  const result = await getUsers();
  res.json(result);
};

export const handleGetUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const result = await getUserById(+id);
    res.json(result);
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const handleUpdateProfile = async (
  req: Request<unknown, unknown, UpdateUser>,
  res: Response
) => {
  try {
    //@ts-ignore
    const result = await updateMe(req.user, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const handleDeleteMe = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    await deleteMe(req.user.id);
    res.status(204).end();
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};
