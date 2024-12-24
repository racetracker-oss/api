import { Router } from "express";
import { me, refreshToken, signIn, signUp } from "./auth.controller";
import { signInSchema, signUpSchema } from "./schemas";
import { validateBody } from "../common";
import { rtStrategy } from "./strategies/rt.strategy";
import { auth } from "./auth.middleware";
import passport from "passport";
const router = Router();

//@ts-ignore
router.post("/auth/sign-in", validateBody(signInSchema), signIn);
router.post("/auth/sign-up", validateBody(signUpSchema), signUp);
router.post(
  "/auth/refresh-token",
  passport.authenticate(rtStrategy, { session: false }),
  refreshToken
);
router.get("/auth/me", auth, me);

export { router as authRouter };
