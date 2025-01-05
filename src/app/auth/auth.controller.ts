import type { Request, Response } from "express";
import type { SignInSchema, SignUpSchema } from "./schemas";
import { generateTokens } from "./commands/generate-token.command";
import { getUserByEmail, getUserById } from "../user";
import { createUser } from "../user/commands/create-user.command";
import { updateRefreshToken, verifyPassword } from "./commands";

export const signIn = async (
  req: Request<unknown, unknown, SignInSchema>,
  res: Response
) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);

    await verifyPassword(user.password, req.body.password);

    const [accessToken, refreshToken] = generateTokens(user);

    await updateRefreshToken(user, refreshToken);

    res.json({ success: true, accessToken, refreshToken });
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const signUp = async (
  req: Request<unknown, unknown, SignUpSchema>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    const [accessToken, refreshToken] = generateTokens(user);

    await updateRefreshToken(user, refreshToken);

    res.status(201).json({ success: true, accessToken, refreshToken });
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = await getUserById(req.user.id);

    const [accessToken, refreshToken] = generateTokens(user);

    await updateRefreshToken(user, refreshToken);

    res.json({ success: true, accessToken, refreshToken });
  } catch (e) {
    res.status(e.status).json({ message: e.message });
  }
};

export const me = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    res.status(403).json({ message: "Forbidden resource." });
    return;
  }

  res.json(user);
};
