import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  PORT: z.number().optional(),
  REFRESH_TOKEN_SECRET: z.string(),
});

const processEnv: z.infer<typeof envSchema> = {
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  PORT: Number.parseInt(process.env.PORT),
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

const result = envSchema.safeParse(processEnv);
if (!result.success) {
  const mapError = result.error.errors
    .map((error) => `${error.path}: ${error.message}`)
    .join("\n");
  console.error(`Error parsing environment variables: \n${mapError}`);
  process.exit(1);
}

export const env = processEnv;
