import validationErrorHandlerMiddleware from "@middlewares/validation-error-handler.middleware";
import { isCelebrateError } from "celebrate";
import { Request, Response } from "express";

jest.mock("celebrate");
const mockedIsCelebrateError = jest.mocked(isCelebrateError);

describe("Validation error handler middleware test :)", () => {
  const req = {} as Request;
  const res = {
    error: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();
  let err: unknown;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Error occurred", () => {
    mockedIsCelebrateError.mockReturnValue(true);
    validationErrorHandlerMiddleware(err, req, res, next);

    expect(res.error).toBeCalled();
    expect(res.error).toBeCalledTimes(1);
  });

  test("Nothing to do", () => {
    mockedIsCelebrateError.mockReturnValue(false);
    validationErrorHandlerMiddleware(err, req, res, next);

    expect(res.error).toHaveBeenCalledTimes(0);
  });
});
