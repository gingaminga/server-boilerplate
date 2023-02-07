import notFoundMiddleware from "@middlewares/not-found.middleware";
import { Request, Response } from "express";

describe("Not found middleware test :)", () => {
  const req = {} as Request;
  const res = {
    error: jest.fn(),
  } as unknown as Response;

  test("Must error", () => {
    notFoundMiddleware(req, res);

    expect(res.error).toBeCalled();
    expect(res.error).toBeCalledTimes(1);
  });
});
