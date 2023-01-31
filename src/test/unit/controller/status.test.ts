import essentialInitLoader from "@/loader";
import { checkStatusController } from "@routers/index";
import { Request, Response } from "express";

describe("서버의 상태를 체크하는 컨트롤러 :)", () => {
  test("서버 상태 비정상", () => {
    const req = {} as Request;
    const res = {
      result: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    checkStatusController(req, res, next);

    expect(res.result).toBeCalledWith("Not OK :(");
  });

  test("서버 상태 정상", () => {
    essentialInitLoader();

    const req = {} as Request;
    const res = {
      result: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    checkStatusController(req, res, next);

    expect(res.result).toBeCalledWith("OK :)");
  });
});
