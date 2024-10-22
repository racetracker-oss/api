import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Request, Response } from "express";
import type { JwtPayload } from "./types";
import type { SignUpSchema } from "./schemas";
import { prisma } from "@/database";
import { env } from "@/env";

export const signIn = async (req: Request, res: Response) => {
  const { body } = req;
  const user = await prisma.user.findFirst({ where: { email: body.email } });
  if (!user) {
    res.json({ success: false, message: "Invalid credentials. " });
    return;
  }

  const isPasswordCorrect = await argon2.verify(user.password, body.password);
  if (!isPasswordCorrect)
    res.json({ success: false, message: "Invalid credentials. " });

  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "4h",
  });

  res.json({ success: true, token });
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
      sub: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "4h",
    });

    res.json({ success: true, token });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002")
        res
          .status(400)
          .json({ success: false, message: "User already exists." });
    }
  }
};
