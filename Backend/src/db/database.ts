import { Pool } from "pg";

const db = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

db
  .connect()
  .catch((e: unknown) =>  {
    if (e instanceof Error) {
      console.error(`Error connecting to Postgres server:\n${e.message}`);
    } else {
      console.error(`Unexpected error connecting to Postgres server:\n${e}`);
    }
  });

export default db;
