import { statusService } from "@loaders/service.loader";
import { RESPONSE_MESSAGE } from "@utils/response";
import { RequestHandler } from "express";

/**
 * @description 서버 상태를 체크하는 컨트롤러
 * @param req Request
 * @param res Response
 */
export const checkStatusController: RequestHandler = async (req, res) => {
  const isHtml = Boolean(req.query.html);

  const isGood = await statusService.getServerStatus();

  const data = isGood ? RESPONSE_MESSAGE.GOOD : RESPONSE_MESSAGE.BAD;

  if (isHtml) {
    res.send(data);

    return;
  }

  res.result(data);
};
