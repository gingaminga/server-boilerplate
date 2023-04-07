// 상위 라우터 관리 파일입니다.

import statusRoutes from "@/routes/status.route";
import { Router } from "express";

const router = Router();

router.use("/status", statusRoutes);

export default router;
