import StatusService from "@services/status.service";
import { RESPONSE_MESSAGE } from "@utils/response";
import { RequestHandler } from "express";
import Container from "typedi";

export const checkStatusController: RequestHandler = (req, res) => {
  const isHtml = Boolean(req.query.html);

  const statusService = Container.get(StatusService);
  const isGood = statusService.getServerStatus();

  const data = isGood ? RESPONSE_MESSAGE.GOOD : RESPONSE_MESSAGE.BAD;

  if (isHtml) {
    res.send(data);

    return;
  }

  res.result(data);
};
