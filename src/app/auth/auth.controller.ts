import argon2 from "argon2";
import type { JwtPayload } from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";
import type { SignInSchema, SignUpSchema } from "./schemas";
import { prisma } from "@/database";
import { generateTokens } from "./commands/generate-token.command";
import { getUserByEmail } from "../user";

export const signIn = async (
  req: Request<unknown, unknown, SignInSchema>,
  res: Response
) => {
  const { body } = req;
  const user = await getUserByEmail(body.email);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials. " });
  }

  const isPasswordCorrect = await argon2.verify(user.password, body.password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials. " });
  }

  const payload: JwtPayload = {
    sub: user.id.toString(),
  };

  const [accessToken, refreshToken] = generateTokens(payload);

  const hashedToken = await argon2.hash(refreshToken);

  await prisma.user.update({
    data: { refreshToken: hashedToken },
    where: { id: user.id },
  });

  res.json({ success: true, accessToken, refreshToken });
};

export const signUp = async (
  req: Request<unknown, unknown, SignUpSchema>,
  res: Response
) => {
  const { body } = req;
  try {
    const hashedPassword = await argon2.hash(body.password);

    const user = await prisma.user.create({
      data: { email: body.email, password: hashedPassword },
    });

    const payload: JwtPayload = {
      sub: user.id.toString(),
    };

    const [accessToken, refreshToken] = generateTokens(payload);

    const hashedToken = await argon2.hash(refreshToken);
    await prisma.user.update({
      data: { refreshToken: hashedToken },
      where: { id: user.id },
    });

    res.json({ success: true, accessToken, refreshToken });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002")
        res
          .status(400)
          .json({ success: false, message: "User already exists." });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    //@ts-ignore - ok, we have typings for req.user, but when you try to compile it, it will throw an error. So, we need to ignore it.
    where: { id: req.user.id },
  });

  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Invalid refresh token. " });
    return;
  }

  const payload: JwtPayload = {
    sub: user.id.toString(),
  };

  const [accessToken, refreshToken] = generateTokens(payload);
  const hashedToken = await argon2.hash(refreshToken);

  await prisma.user.update({
    data: { refreshToken: hashedToken },
    where: { id: user.id },
  });

  res.json({ success: true, accessToken, refreshToken });
};

export const me = async (req: Request, res: Response) => {
  const { user } = req;

  if (!user) {
    res.status(403).json({ message: "Forbidden resource." });
    return;
  }

  res.json({ user });
};
