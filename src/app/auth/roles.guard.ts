import { rbac } from "./rbac/permissions";
import type { Permissions } from "./rbac/types";

import type { NextFunction, Request, Response } from "express";

export const rolesGuard = (actions: Permissions[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role === "ADMIN") {
      next();
    }

    if (rbac[user.role].some((permission) => actions.includes(permission))) {
      next();
    }

    res.status(403).json({ message: "Forbidden" });
  };
};
