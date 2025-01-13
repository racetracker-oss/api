import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

type Options = "query" | "body" | "params";

export const zValidator = (option: Options, schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (option === "query") {
        schema.parse(req.query);
      }

      if (option === "body") {
        schema.parse(req.body);
      }

      if (option === "params") {
        schema.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error);
      }
    }
  };
};
