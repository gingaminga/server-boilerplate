import { statusService } from "@loaders/service.loader";
import { RESPONSE_MESSAGE } from "@utils/response";
import { RequestHandler } from "express";

export const checkStatusController: RequestHandler = async (req, res) => {
  try {
    const isHtml = Boolean(req.query.html);

    const isGood = await statusService.getServerStatus();

    const data = isGood ? RESPONSE_MESSAGE.GOOD : RESPONSE_MESSAGE.BAD;

    if (isHtml) {
      res.send(data);

      return;
    }

    res.result(data);
  } catch (error) {
    res.error(error);
  }
};
