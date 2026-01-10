import * as dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config()

export default defineConfig({
  out: './migrations',
  schema: './src/infrastructure/db/schemas.ts',
  breakpoints: false,
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
