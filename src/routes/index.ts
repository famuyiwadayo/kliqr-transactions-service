import { Router } from "express";
import TransactionRouter from "./transaction.routes";

const routes = Router();

routes.use("/transactions", TransactionRouter);

export default routes;
