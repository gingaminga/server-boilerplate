import { checkStatusController } from "@controllers/status.controller";
import { checkStatusSchema } from "@validators/status.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/status", checkStatusSchema, checkStatusController);

export default router;
