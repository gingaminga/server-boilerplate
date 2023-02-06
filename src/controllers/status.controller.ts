import StatusService from "@services/status.service";
import { RequestHandler } from "express";
import Container from "typedi";

export const checkStatusController: RequestHandler = (req, res) => {
  const statusService = Container.get(StatusService);
  const isGood = statusService.getServerStatus();

  if (isGood) {
    res.result("OK :)");

    return;
  }

  res.result("Not OK :(");
};
