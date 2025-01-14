import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

export const removeSensitiveInfo = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json;
  let newData: unknown;

  res.json = function (data: unknown) {
    if (Array.isArray(data)) {
      const sanitizedData = (data as User[]).map((user) => {
        const { password, refreshToken, ...rest } = user;
        return rest;
      });
      newData = sanitizedData;
    }

    if (!Array.isArray(data)) {
      const { password, refreshToken, ...rest } = data as User;
      newData = rest;
    }

    return originalJson.call(this, newData);
  };

  next();
};
