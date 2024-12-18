import { type IVerifyOptions, Strategy } from "passport-http-bearer";
import type { JwtPayload as CustomPayload } from "./types";
import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken";
import { prisma } from "src/database";

export const strategy = new Strategy(
  async (
    token: string,
    done: (
      error: unknown,
      user?: CustomPayload | boolean | Record<string, unknown>,
      options?: IVerifyOptions | string
    ) => void
  ) => {
    try {
      const verifyToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as unknown as JwtPayload & CustomPayload;
      if (!verifyToken) return done(verifyToken);

      const user = await prisma.user.findFirst({
        where: { email: verifyToken.email },
      });

      if (!user) return done(null, false);

      const payloadUser: CustomPayload = {
        sub: user.id,
        email: user.email,
      };

      return done(null, payloadUser, { scope: "all" });
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        return done(null, { sucess: false, message: "Invalid token." });
      }
    }
  }
);
