import { Pool } from "pg";
import { config } from "../config/config";

interface ICustomQuery {
  command: string;
  rowCount: string | number;
  oid: string | number;
  rows: Array<any>;
  fields: Array<any>;
}

const pool = new Pool({
  connectionString: config.DB_URI,
});

// a generic query, that executes all queries you send to it
export const query = (
  queryStream: any,
  params?: any
): Promise<ICustomQuery> => {
  return new Promise((resolve, reject) => {
    pool
      .query(queryStream, params)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

/**
 * Create User Table
 */
const createUserTable = async () => {
  try {
    const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        first_name VARCHAR(128),
        last_name VARCHAR(128),
        avatar VARCHAR,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      )`;

    await query(queryText);
    console.log("Created the user table");
    pool.end();
  } catch (error) {
    console.log(error);
    pool.end();
  }
};

/**
 * Drop User Table
 */
const dropUserTable = async () => {
  try {
    const queryText = "DROP TABLE IF EXISTS users";
    await query(queryText);
    pool.end();
    console.log("Dropped the user table");
  } catch (error) {
    console.log(error);
    pool.end();
  }
};

// pool.on("remove", () => {
//   console.log("client removed");
//   process.exit(0);
// });

module.exports = {
  createUserTable,
  dropUserTable,
  query,
};

require("make-runnable");
