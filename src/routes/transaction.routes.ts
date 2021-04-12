import { Router } from "express";
import { TransactionController } from "../controllers";
import { upload } from "../middlewares";

const router = Router();
const controller = new TransactionController();

router.post("/", controller.createTransaction);
router.post(
  "/batch",
  upload.single("file"),
  controller.batchCreateTransactionsFromCsv
);

router.get("/", controller.getTransactions);
router.get("/:id", controller.getTransactionById);
router.get("/users/:id", controller.getTransactionsByUserId);

export default router;
