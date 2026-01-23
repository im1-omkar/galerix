import pg from "pg";
const URL = "";

export const pool = new pg.Pool({
  connectionString: "",
});