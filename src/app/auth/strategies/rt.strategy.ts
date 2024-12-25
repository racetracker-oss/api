import { Strategy } from "passport-http-bearer";
import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken";
import argon2 from "argon2";
import { env } from "@/env";
import { getUserById } from "@/app/user";
import { AuthenticationError } from "../errors/authentication.error";
import passport from "passport";
import type { NextFunction, Request, Response } from "express";

const strategy = new Strategy(async (token: string, done) => {
  try {
    const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload;

    const dbUser = await getUserById(+payload.sub);

    if (!dbUser) {
      throw new AuthenticationError("User not found");
    }

    const isValid = await argon2.verify(dbUser.refreshToken, token);
    if (!isValid) {
      throw new AuthenticationError("Invalid refresh token");
    }

    return done(null, dbUser);
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return done({ message: "Invalid refresh token", scope: "all" });
    }
    return done(null, false, {
      message: "Internal server error",
      scope: "all",
    });
  }
});

export const rtStrategy = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(strategy, { session: false }, (err, user) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = user;
    next();
  })(req, res, next);
};
