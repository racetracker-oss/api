import { prisma } from "@/database";
import type { Role } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

export const rolesGuard =
  (roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({ where: { id: +req.user.id } });
    if (!user) {
      return res.status(403).send("Forbidden");
    }

    if (roles.includes(user.role)) {
      return next();
    }

    return res.status(403).send("Forbidden");
  };
