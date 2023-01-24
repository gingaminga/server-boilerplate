import sample from "@routers/sample";
import express from "express";

const router = express.Router();

router.use("/sample", sample); // 라우터 미들웨어

router.get("/status", (req, res, next) => {
  res.send("OK");
});

export default router;
