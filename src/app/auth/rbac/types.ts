import type { Prisma, Role } from "@prisma/client";

export type CrudActions = "create" | "read" | "update" | "delete";
type PrismaModels = Lowercase<Extract<keyof typeof Prisma.ModelName, string>>;

export type Permissions =
  | `${PrismaModels}:${CrudActions}`
  | `${PrismaModels}:*`
  | "*";

export type RBAC = {
  [key in Lowercase<Role>]: Permissions[];
};
