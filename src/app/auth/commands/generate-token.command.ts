import { env } from "@/env";
import type { User } from "@prisma/client";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const generateTokens = (user: User) => {
  const payload: JwtPayload = {
    sub: user.id.toString(),
  };

  const [accessToken, refreshToken] = [
    jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    }),
    jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    }),
  ];

  return [accessToken, refreshToken];
};
