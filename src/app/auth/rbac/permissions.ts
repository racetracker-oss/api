import type { RBAC } from "./types";

export const rbac: RBAC = {
  admin: ["user:*", "checkpoint:*"],
  user: ["user:read", "race:create"],
} as const;
