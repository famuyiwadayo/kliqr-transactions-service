import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import "dotenv/config";
import Routes from "./routes";
import {
  catchRequest,
  compressor,
  handleError,
  logRequests,
} from "./middlewares";
import { config } from "./config/config";

const app: Express = express();

app.use(helmet());
app.use(compressor());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logRequests);

app.use("/v1", Routes);
app.get("/", (_, res) =>
  res
    .status(200)
    .json({ name: "Transaction", type: "microservice", version: "1.0.0" })
);

// catch 404 and forward to error handler
app.use(catchRequest);
app.use(handleError);

app.listen(config.PORT, () => console.log(`🚀 Transaction microservice running on localhost:${config.PORT} ⚡`));
