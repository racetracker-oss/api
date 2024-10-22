import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  PORT: z.number().optional(),
});

const processEnv: z.infer<typeof envSchema> = {
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  PORT: Number.parseInt(process.env.PORT),
};

const result = envSchema.safeParse(processEnv);
if (!result.success) {
  const mapError = result.error.errors
    .map((error) => `${error.path}: ${error.message}`)
    .join("\n");
  console.error(`Error parsing environment variables: \n${mapError}`);
}

export const env = processEnv;
