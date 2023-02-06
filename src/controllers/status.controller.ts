import StatusService from "@services/status.service";
import { RequestHandler } from "express";
import Container from "typedi";

export const checkStatusController: RequestHandler = (req, res) => {
  const isHtml = Boolean(req.query.html);

  const statusService = Container.get(StatusService);
  const isGood = statusService.getServerStatus();

  const data = isGood ? "OK :)" : "Not OK :(";

  if (isHtml) {
    res.send(data);

    return;
  }

  res.result(data);
};
