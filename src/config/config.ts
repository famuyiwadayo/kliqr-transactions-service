import "dotenv/config";

export const config = {
  DB_URI: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string | number
};
