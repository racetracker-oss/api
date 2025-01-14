import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  PORT: z.number().optional(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
});

// Safely parse and convert the environment variables
const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "",
  PORT: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : undefined,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "",
};

async function parseEnv() {
  const result = await envSchema.safeParseAsync(processEnv);
  if (!result.success) {
    const mapError = result.error.errors
      .map((error) => `${error.path.join(".")}: ${error.message}`)
      .join("\n");
    console.error(`Error parsing environment variables: \n${mapError}`);
    process.exit(1);
  }
  return result.data;
}

parseEnv();

export const env = processEnv;
