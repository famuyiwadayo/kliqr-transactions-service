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
router.get("/users/:id/count", controller.getTotalUserTxByUserId);
router.get("/users/:id/spent-and-income", controller.getTotalUserSpentAndInomeByUserId);
router.get("/users/:id/spent-income-and-txCount", controller.getUserSpentAndInomeAndTxCount);
router.post("/users/:id/similar-users", controller.getSimilarUsers);
router.get("/users/:id/spent-income-and-txCount", controller.getUserSpentAndInomeAndTxCount);
router.get("/users/:id/top-five-categories", controller.getUserTopFiveCategories);

export default router;
