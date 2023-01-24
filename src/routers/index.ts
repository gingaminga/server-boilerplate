import sample from "@routers/sample";
import { RequestHandler, Router } from "express";

const router = Router();

// 라우터 미들웨어
router.use("/sample", sample);

const checkStatus: RequestHandler = (req, res, next) => {
  res.send("OK");
};

router.get("/status", checkStatus);

export default router;
