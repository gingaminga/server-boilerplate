// 모든 router들이 연결되는 root 파일입니다.

import sample from "@routers/sample";
import express from "express";

const router = express.Router();

// 라우터 미들웨어
router.use("/sample", sample);

router.get("/status", (req, res, next) => {
  res.send("OK");
});

export default router;
