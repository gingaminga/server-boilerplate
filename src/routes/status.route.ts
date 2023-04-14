import { checkStatusController } from "@/controllers/status.controller";
import { checkStatusValidator } from "@/validators/check-status.validator";
import { Router } from "express";
import asyncify from "express-asyncify";

const router = asyncify(Router());

router.get("/", checkStatusValidator, checkStatusController);

export default router;
