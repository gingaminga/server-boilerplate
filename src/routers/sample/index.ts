import validationParameter from "@middlewares/validationParameter";
import SampleService from "@services/sample";
import { RequestHandler, Router } from "express";
import { query } from "express-validator";
import { Container } from "typedi";

const router = Router();

const validation = [query("num").isNumeric().toInt(), validationParameter];

const sample: RequestHandler = (req, res, next) => {
  const number = Number(req.query.num);

  const sampleService = Container.get(SampleService);

  sampleService.setNumber(number);

  const newNumber = sampleService.getNumber();
  res.send(`변경된 숫자는 ${newNumber}입니다.`);
};

/**
 * @description 파라미터에 대한 validation을 처리하는 샘플 router입니다. 브라우저에서 테스트해보세요. (http://127.0.0.1:3001/api/sample)
 */
router.get("/", ...validation, sample);

export default router;
