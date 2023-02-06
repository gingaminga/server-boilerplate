import { checkStatusController } from "@controllers/status.controller";
import { checkStatusSchema } from "@validators/status.validator";
import { Router } from "express";

const router = Router();

router.get("/status", checkStatusSchema, checkStatusController);

export default router;
