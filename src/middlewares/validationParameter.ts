import CError, { ERROR_MESSAGE } from "@utils/error";
import HTTP_STATUS_CODE from "@utils/httpStatusCode";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * @description 파라미터 유효성 검사하는 미들웨어
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new CError(ERROR_MESSAGE.INVALID_VALUE, HTTP_STATUS_CODE.INVALID_VALUE);
    logger.error(error.stack);
    res.error(error);

    return;
  }

  next();
};
