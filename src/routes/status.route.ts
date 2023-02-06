import { checkStatusController } from "@controllers/status.controller";
import { Router } from "express";

const router = Router();

router.get("/status", checkStatusController);

export default router;
