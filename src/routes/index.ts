import statusRoutes from "@routes/status.route";
import { Router } from "express";

const router = Router();

router.use("/status", statusRoutes);

export default router;
