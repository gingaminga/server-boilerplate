import StatusService from "@services/status";
import { RequestHandler, Router } from "express";
import Container from "typedi";

const router = Router();

export const checkStatusController: RequestHandler = (req, res) => {
  const statusService = Container.get(StatusService);
  const isGood = statusService.getServerStatus();

  if (isGood) {
    res.result("OK :)");

    return;
  }

  res.result("Not OK :(");
};

router.get("/status", checkStatusController);

export default router;
