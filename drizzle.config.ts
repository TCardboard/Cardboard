import { defineConfig } from "drizzle-kit";
import { env } from "@/libs/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/libs/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
