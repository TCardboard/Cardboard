import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// t3-oss env object that validates env variables and restricts access to only server-side
export const env = createEnv({
  server: {
    APP_URL: z.url().default("https://wdcc.co.nz"),
    BETTER_AUTH_URL: z.url().default("https://wdcc.co.nz"),
    BETTER_AUTH_SECRET: z.string().min(32),
    DATABASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
