import { Strategy } from "passport-http-bearer";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "@/env";
import passport from "passport";
import type { NextFunction, Request, Response } from "express";
import { getUserById } from "@/app/user";

const strategy = new Strategy(async (token: string, done) => {
  try {
    const decodedToken = jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    const user = await getUserById(+decodedToken.sub);

    if (!user) {
      return done(null, false);
    }

    const payloadUser = {
      ...user,
      sub: user.id.toString(),
    };

    const { password, refreshToken, ...safePayloadUser } = payloadUser;

    return done(null, safePayloadUser);
  } catch (e) {
    return done(e);
  }
});

export const atStrategy = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(strategy, { session: false }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!user) {
      console.log(user);
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = user;
    next();
  })(req, res, next);
};
