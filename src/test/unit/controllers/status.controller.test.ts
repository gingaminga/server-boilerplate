import { checkStatusController } from "@/controllers/status.controller";
import { CheckStatusRequestParamDTO } from "@/dto/check-status.request.param.dto";
import { statusService } from "@/loaders/service.loader";
import { ResponseDTO } from "@/types/express.custom";
import { RESPONSE_MESSAGE } from "@/utils/response";
import { Request } from "express";

const req = {
  query: {},
} as unknown as Request;
const res = {
  result: jest.fn(),
  send: jest.fn(),
  locals: {
    dto: {
      isHTML: true,
    },
  },
} as unknown as ResponseDTO<CheckStatusRequestParamDTO>;
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
      (res.locals.dto.isHTML as unknown) = true;
      checkStatusController(req, res, next);

      expect(res.send).toHaveBeenCalledWith(RESPONSE_MESSAGE.BAD);
      expect(res.result).not.toHaveBeenCalled();
    });

    test("Should response with bad message in json", () => {
      (res.locals.dto.isHTML as unknown) = false;
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
      (res.locals.dto.isHTML as unknown) = true;
      checkStatusController(req, res, next);

      expect(res.send).toHaveBeenCalledWith(RESPONSE_MESSAGE.GOOD);
      expect(res.result).not.toHaveBeenCalled();
    });

    test("Should response with good message in json", () => {
      (res.locals.dto.isHTML as unknown) = false;
      checkStatusController(req, res, next);

      expect(res.result).toHaveBeenCalledWith(RESPONSE_MESSAGE.GOOD);
      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
