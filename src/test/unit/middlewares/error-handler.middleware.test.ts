import errorHandlerMiddleware from "@middlewares/error-handler.middleware";
import HTTP_STATUS_CODE from "@utils/http-status-code";
import { ERROR_MESSAGE } from "@utils/error";
import { isError } from "joi";
import { Request, Response } from "express";

jest.mock("joi");
const mockedIsJoiError = jest.mocked(isError);

const req = {} as Request;
const res = {
  error: jest.fn(),
} as unknown as Response;
const next = jest.fn();
let err: unknown;

describe("Error handler middleware test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Should call res.error() with a ${HTTP_STATUS_CODE.INVALID_VALUE} error`, () => {
    mockedIsJoiError.mockReturnValue(true);
    errorHandlerMiddleware(err, req, res, next);

    expect(res.error).toBeCalledTimes(1);
    expect(res.error).toBeCalledWith(
      expect.objectContaining({
        code: HTTP_STATUS_CODE.INVALID_VALUE,
        message: ERROR_MESSAGE.INVALID_VALUE,
      }),
    );
  });

  test(`Should call res.error() with a ${HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR} error`, () => {
    mockedIsJoiError.mockReturnValue(false);
    errorHandlerMiddleware(err, req, res, next);

    expect(res.error).toBeCalledTimes(1);
    expect(res.error).toBeCalledWith(
      expect.objectContaining({
        code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      }),
    );
  });
});
