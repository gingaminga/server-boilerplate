import { checkStatusController } from "@controllers/status.controller";
import { statusService } from "@loaders/service.loader";
import { RESPONSE_MESSAGE } from "@utils/response";
import { Request, Response } from "express";

const req = {
  query: {},
} as unknown as Request;
const res = {
  result: jest.fn(),
  send: jest.fn(),
} as unknown as Response;
const next = jest.fn();

describe("Check status controller test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Server status is bad", () => {
    beforeEach(() => {
      jest.spyOn(statusService, "getServerStatus").mockReturnValue(false);
    });

    test("Should response with bad message in html", () => {
      (req.query.html as unknown) = true;
      checkStatusController(req, res, next);

      expect(res.send).toHaveBeenCalledWith(RESPONSE_MESSAGE.BAD);
      expect(res.result).not.toHaveBeenCalled();
    });

    test("Should response with bad message in json", () => {
      (req.query.html as unknown) = false;
      checkStatusController(req, res, next);

      expect(res.result).toHaveBeenCalledWith(RESPONSE_MESSAGE.BAD);
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe("Server status is good", () => {
    beforeEach(() => {
      jest.spyOn(statusService, "getServerStatus").mockReturnValue(true);
    });

    test("Should response with good message in html", () => {
      (req.query.html as unknown) = true;
      checkStatusController(req, res, next);

      expect(res.send).toHaveBeenCalledWith(RESPONSE_MESSAGE.GOOD);
      expect(res.result).not.toHaveBeenCalled();
    });

    test("Should response with good message in json", () => {
      (req.query.html as unknown) = false;
      checkStatusController(req, res, next);

      expect(res.result).toHaveBeenCalledWith(RESPONSE_MESSAGE.GOOD);
      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
