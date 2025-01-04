import { addDays } from "date-fns";
import { z } from "zod";
import { createCheckpointSchema } from "../checkpoints/schemas/checkpoint.schema";

export const createRaceSchema = z.object({
  name: z.string().min(2).max(255),
  startDate: z.coerce.date().default(() => new Date()),
  joinUntil: z.coerce.date().default(() => addDays(new Date(), 7)),
  checkPoints: z.array(createCheckpointSchema).optional(),
});

export type CreateRace = z.infer<typeof createRaceSchema>;
