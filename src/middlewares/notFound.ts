import CError, { ERROR_MESSAGE } from "@utils/error";
import HTTP_STATUS_CODE from "@utils/httpStatusCode";
import { Request, Response } from "express";

/**
 * @description 404 미들웨어
 */
export default (req: Request, res: Response) => {
  const error = new CError(ERROR_MESSAGE.NOT_FOUND, HTTP_STATUS_CODE.NOT_FOUND);

  res.error(error);
};
