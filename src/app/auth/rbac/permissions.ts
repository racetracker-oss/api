import type { RBAC } from "./types";

export const rbac: RBAC = {
  admin: ["user:*", "checkpoint:*", "race:*"],
  user: ["user:read", "race:read", "race:delete"],
} as const;
