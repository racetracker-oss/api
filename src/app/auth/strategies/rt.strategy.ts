import { Strategy } from "passport-http-bearer";
import jwt, { type JwtPayload } from "jsonwebtoken";
import argon2 from "argon2";
import { env } from "@/env";
import { getUserById } from "@/app/user";
import passport from "passport";
import type { NextFunction, Request, Response } from "express";

const strategy = new Strategy(async (token: string, done) => {
  try {
    const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as JwtPayload;

    const dbUser = await getUserById(+payload.sub);

    if (!dbUser) {
      return done(null, false);
    }

    const isValid = await argon2.verify(dbUser.refreshToken, token);
    if (!isValid) {
      return done("Invalid refresh token", false);
    }

    return done(null, dbUser);
  } catch (e) {
    return done(e);
  }
});

export const rtStrategy = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
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
