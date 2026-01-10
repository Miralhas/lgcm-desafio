import * as schemas from "./schemas"
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import { defineRelations } from "drizzle-orm";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
  schema: schemas,
  relations: schemas.relations,
});

export type DB = typeof db;