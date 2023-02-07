import { checkStatusController } from "@controllers/status.controller";
import StatusService from "@services/status.service";
import { Request, Response } from "express";
import Container from "typedi";

describe("Status controller test :)", () => {
  const req = {
    query: {},
  } as unknown as Request;
  const res = {
    result: jest.fn(),
    send: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const statusService = Container.get(StatusService);

  beforeEach(() => {
    (req.query.html as unknown) = false;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Server status is bad :(", () => {
    statusService.getServerStatus = jest.fn(() => false);

    test("Response html", () => {
      (req.query.html as unknown) = true;
      checkStatusController(req, res, next);

      expect(res.send).toBeCalled();
      expect(res.send).toBeCalledTimes(1);
    });

    test("Response json", () => {
      checkStatusController(req, res, next);

      expect(res.result).toBeCalled();
      expect(res.result).toBeCalledTimes(1);
    });
  });

  describe("Server status is good :)", () => {
    statusService.getServerStatus = jest.fn(() => true);

    test("Response html", () => {
      (req.query.html as unknown) = true;
      checkStatusController(req, res, next);

      expect(res.send).toBeCalled();
      expect(res.send).toBeCalledTimes(1);
    });

    test("Response json", () => {
      checkStatusController(req, res, next);

      expect(res.result).toBeCalled();
      expect(res.result).toBeCalledTimes(1);
    });
  });
});
