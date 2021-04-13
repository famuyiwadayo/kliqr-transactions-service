import "dotenv/config";

export const config = {
  DB_URI: process.env.DB_URI as string,
  PORT: process.env.PORT as string | number
};
