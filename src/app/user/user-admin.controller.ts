import type { Request, Response } from "express";
import type { AdminUpdateUser, CreateUser } from "./schemas";
import { createUser, updateUser } from "./commands";
import { deleteUser } from "./commands/delete-user.command";

export const handleCreateUser = async (
  req: Request<unknown, unknown, CreateUser>,
  res: Response
) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const handleAdminUpdateUser = async (
  req: Request<{ id: string }, unknown, AdminUpdateUser>,
  res: Response
) => {
  try {
    const result = await updateUser(+req.params.id, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const handleAdminDeleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    await deleteUser(+req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};
