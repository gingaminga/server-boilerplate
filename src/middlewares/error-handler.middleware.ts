import CError, { ERROR_MESSAGE } from "@/utils/error";
import HTTP_STATUS_CODE from "@/utils/http-status-code";
import { NextFunction, Request, Response } from "express";
import { isError } from "joi";

/**
 * @description error handler 미들웨어
 */
export default (error: unknown, _req: Request, res: Response, _: NextFunction) => {
  if (isError(error)) {
    // validation 에러 처리
    const customError = new CError(ERROR_MESSAGE.INVALID_VALUE, HTTP_STATUS_CODE.INVALID_VALUE);
    res.error(customError);

    return;
  }

  const customError = new CError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  res.error(customError);
};
