import { Router } from "express";
import { me, refreshToken, signIn, signUp } from "./auth.controller";
import { signInSchema, signUpSchema } from "./schemas";
import { validateBody } from "../common";
import { rtStrategy } from "./strategies/rt.strategy";
import { atStrategy } from "./strategies/at.strategy";

const router = Router();

//@ts-ignore
router.post("/auth/sign-in", validateBody(signInSchema), signIn);
router.post("/auth/sign-up", validateBody(signUpSchema), signUp);
router.post("/auth/refresh-token", rtStrategy, refreshToken);
router.get("/auth/me", atStrategy, me);

export { router as authRouter };
