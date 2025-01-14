import { Router } from "express";
import {
  handleLogout,
  me,
  refreshToken,
  signIn,
  signUp,
} from "./auth.controller";
import { signInSchema, signUpSchema } from "./schemas";
import { zValidator } from "../common";
import { rtStrategy } from "./strategies/rt.strategy";
import { atStrategy } from "./strategies/at.strategy";

const router = Router();

//@ts-ignore
router.post("/auth/sign-in", zValidator("body", signInSchema), signIn);
router.post("/auth/sign-up", zValidator("body", signUpSchema), signUp);
router.post("/auth/refresh-token", rtStrategy, refreshToken);
router.get("/auth/me", atStrategy, me);
router.post("/auth/logout", atStrategy, handleLogout);

export { router as authRouter };
