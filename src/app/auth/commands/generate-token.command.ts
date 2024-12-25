import { env } from "@/env";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const generateTokens = (payload: JwtPayload) => {
  const [accessToken, refreshToken] = [
    jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: env.ACCESS_TOKEN_EXPIRES_IN }),
    jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRES_IN }),
  ];

  return [accessToken, refreshToken];
};
