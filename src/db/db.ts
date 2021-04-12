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
const createTransactionTable = async () => {
  try {
    const queryText = `CREATE TABLE IF NOT EXISTS
      transactions(
        id SERIAL PRIMARY KEY,
        user_id INT,
        amount BIGINT,
        type VARCHAR(128),
        category VARCHAR,
        icon_url VARCHAR,
        date_time TIMESTAMP
      )`;

    await query(queryText);
    console.log("Created the transactions table");
    pool.end();
  } catch (error) {
    console.log(error);
    pool.end();
  }
};

/**
 * Drop User Table
 */
const dropTransactionTable = async () => {
  try {
    const queryText = "DROP TABLE IF EXISTS users";
    await query(queryText);
    pool.end();
    console.log("Dropped the transactions table");
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
  query,
  createTable: createTransactionTable,
  dropTable: dropTransactionTable,
};

require("make-runnable");
