import { Router } from "express";
import { removeSensitiveInfo } from "./middlewares";
import {
  handleDeleteMe,
  handleGetUserById,
  handleGetUsers,
  handleUpdateProfile,
} from "./user.controller";
import { atStrategy } from "../auth/strategies/at.strategy";
import { zValidator } from "../common";
import { userProfileUpdateSchema } from "./schemas";
import { z } from "zod";
import { userAdminRouter } from "./user-admin.router";

const router = Router();

router.use(removeSensitiveInfo);

router.get("/user", handleGetUsers);
router.get(
  "/user/:id",
  zValidator(
    "params",
    z.object({
      id: z.coerce.number(),
    })
  ),
  handleGetUserById
);

router.put(
  "/user",
  atStrategy,
  zValidator("body", userProfileUpdateSchema),
  handleUpdateProfile
);

router.delete("/user", atStrategy, handleDeleteMe);

router.use(userAdminRouter);

export { router as userRouter };
