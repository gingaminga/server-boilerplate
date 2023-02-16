import notFoundMiddleware from "@middlewares/not-found.middleware";
import { ERROR_MESSAGE } from "@utils/error";
import HTTP_STATUS_CODE from "@utils/http-status-code";
import { Request, Response } from "express";

const req = {} as Request;
const res = {
  error: jest.fn(),
} as unknown as Response;

describe("Not found middleware test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Should call res.error() with a ${HTTP_STATUS_CODE.NOT_FOUND} error`, () => {
    notFoundMiddleware(req, res);

    expect(res.error).toBeCalledTimes(1);
    expect(res.error).toBeCalledWith(
      expect.objectContaining({
        code: HTTP_STATUS_CODE.NOT_FOUND,
        message: ERROR_MESSAGE.NOT_FOUND,
      }),
    );
  });
});
