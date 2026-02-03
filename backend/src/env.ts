import { defineEnv } from "zenvx";
import z from "zod";
import "dotenv/config";
const schema = z.object({
  PORT: z.number().default(1234),
  COOKIE_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  JWT_ACCESS: z.string(),
  JWT_REFRESH: z.string(),
  DATABASE_URL: z.string(),
});

export const env = defineEnv(schema, {
  generateExample: true,
});
