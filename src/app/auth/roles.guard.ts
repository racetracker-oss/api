import { rbac } from "./rbac/permissions";
import type { Permissions } from "./rbac/types";

import type { NextFunction, Request, Response } from "express";

export const rolesGuard = (actions: Permissions[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (rbac[user.role].some((permission) => actions.includes(permission))) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};
