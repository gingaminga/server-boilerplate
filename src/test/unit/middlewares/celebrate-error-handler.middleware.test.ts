import celebrateErrorHandlerMiddleware from "@middlewares/celebrate-error-handler.middleware";
import { isCelebrateError } from "celebrate";
import { Request, Response } from "express";

jest.mock("celebrate");
const mockedIsCelebrateError = jest.mocked(isCelebrateError);

describe("Celebrate error handler middleware test :)", () => {
  const req = {} as Request;
  const res = {
    error: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();
  let err: unknown;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Must error", () => {
    mockedIsCelebrateError.mockReturnValue(true);
    celebrateErrorHandlerMiddleware(err, req, res, next);

    expect(res.error).toBeCalled();
    expect(res.error).toBeCalledTimes(1);
  });

  test("Nothing to do", () => {
    mockedIsCelebrateError.mockReturnValue(false);
    celebrateErrorHandlerMiddleware(err, req, res, next);

    expect(res.error).toHaveBeenCalledTimes(0);
  });
});
