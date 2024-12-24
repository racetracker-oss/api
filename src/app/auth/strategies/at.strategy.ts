import { Strategy } from "passport-http-bearer";
import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken";
import { prisma } from "@/database";
import { env } from "@/env";

export const atStrategy = new Strategy(async (token: string, done) => {
  try {
    const verifyToken = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET
    ) as JwtPayload;
    if (!verifyToken) {
      return done(null, false, {
        message: "Invalid access token",
        scope: "all",
      });
    }

    const user = await prisma.user.findFirst({
      where: { id: +verifyToken.sub },
    });

    if (!user) {
      return done(null, false, { message: "User not found", scope: "all" });
    }

    const payloadUser = {
      ...user,
      sub: user.id.toString(),
    };

    return done(null, payloadUser);
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return done(e);
    }
    return done(e);
  }
});
