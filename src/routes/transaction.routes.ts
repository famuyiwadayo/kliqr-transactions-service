import { Router } from "express";
import { UserController } from "../controllers";
import { upload } from "../middlewares";

const router = Router();
const controller = new UserController();

router.post("/", controller.createUser);
router.post("/batch", controller.batchCreateUser);
router.post(
  "/batch/csv",
  upload.single("file"),
  controller.batchCreateUsersFromCsv
);

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);

export default router;
