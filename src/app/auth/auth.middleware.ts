import passport from "passport";
import { atStrategy } from "./strategies/at.strategy";
import type { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "./errors/authentication.error";

export const auth = passport.authenticate(atStrategy, {
  session: false,
});

export const authErrorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AuthenticationError) {
    res.status(401).json({ message: err.message });
    return;
  }
  next();
};
