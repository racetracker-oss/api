import { z } from "zod";

export const createCheckpointSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  order: z.number(),
});

export type CreateCheckpoint = z.infer<typeof createCheckpointSchema>;
