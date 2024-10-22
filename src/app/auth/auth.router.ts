import { Router } from "express";
import { signIn, signUp } from "./auth.controller";
import { signInSchema, signUpSchema } from "./schemas";
import { validateBody } from "../common";
const router = Router();

//@ts-ignore
router.post("/auth/sign-in", validateBody(signInSchema), signIn);
router.post("/auth/sign-up", validateBody(signUpSchema), signUp);

export { router as authRouter };
