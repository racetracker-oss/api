import { Router } from "express";
import { atStrategy } from "../auth/strategies/at.strategy";
import { rolesGuard } from "../auth/roles.guard";
import { zValidator } from "../common";
import { adminUpdateUserSchema, createUserSchema } from "./schemas";
import {
  handleAdminDeleteUser,
  handleAdminUpdateUser,
  handleCreateUser,
} from "./user-admin.controller";
import { z } from "zod";

const router = Router();

router.post(
  "/admin/user",
  atStrategy,
  rolesGuard(["user:create"]),
  zValidator("body", createUserSchema),
  handleCreateUser
);

router.put(
  "/admin/user/:id",
  atStrategy,
  rolesGuard(["user:update"]),
  zValidator(
    "params",
    z.object({
      id: z.coerce.number(),
    })
  ),
  zValidator("body", adminUpdateUserSchema),
  handleAdminUpdateUser
);

router.delete(
  "/admin/user/:id",
  atStrategy,
  rolesGuard(["user:delete"]),
  zValidator(
    "params",
    z.object({
      id: z.coerce.number(),
    })
  ),
  handleAdminDeleteUser
);

export { router as userAdminRouter };
