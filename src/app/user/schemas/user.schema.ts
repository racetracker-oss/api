import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().nullable().optional(),
  role: z.nativeEnum(Role).default(Role.USER),
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const userProfileUpdateSchema = z.object({
  email: z.string().email().optional(),
  currentPassword: z.string().min(6).optional(),
  password: z.string().min(6).optional(),
  name: z.string().nullable().optional(),
});

export type UpdateUser = z.infer<typeof userProfileUpdateSchema>;

export const adminUpdateUserSchema = userProfileUpdateSchema
  .omit({
    currentPassword: true,
  })
  .extend({
    role: z.nativeEnum(Role).optional(),
  });
export type AdminUpdateUser = z.infer<typeof adminUpdateUserSchema>;
