import validationParameter from "@middlewares/validationParameter";
import express from "express";
import { query } from "express-validator";

const router = express.Router();

const validation = [query("username").isEmail(), validationParameter];

/**
 * @description 파라미터에 대한 validation을 처리하는 샘플 router입니다. 브라우저에서 테스트해보세요. (http://127.0.0.1:3001/api/sample)
 */
router.get("/", ...validation, (req, res, next) => {
  res.send("OK");
});

export default router;
