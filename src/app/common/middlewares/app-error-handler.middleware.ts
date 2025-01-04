import type { NextFunction, Request, Response } from "express";
import { AppError } from "../app-error";

export const appErrorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.status).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
  next();
};
