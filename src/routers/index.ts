import sample from "@routers/sample";
import express from "express";

const router = express.Router();

// 라우터 미들웨어
router.use("/sample", sample);

const checkStatus = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send("OK");
};

router.get("/status", checkStatus);

export default router;
