import { Pool } from "pg";

const db = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  connectionString: process.env.DATABASE_URL
});

// Set the search path to "public" to avoid schema-related issues
db.query('SET search_path TO public;').catch((e: unknown) => {
  if (e instanceof Error) {
    console.error(`Error setting search_path to public:\n${e.message}`);
  } else {
    console.error(`Unexpected error setting search_path to public:\n${e}`);
  }
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
