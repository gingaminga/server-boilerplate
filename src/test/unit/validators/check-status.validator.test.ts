import { CheckStatusRequestParamDTO } from "@/dto/check-status.request.param.dto";
import { ResponseDTO } from "@/types/express.custom";
import { checkStatusSchema, checkStatusValidator } from "@/validators/check-status.validator";
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

describe("Validator check status test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Should throw error when parameter is not boolean type`, async () => {
    const error = new Error("validate error");
    jest.spyOn(checkStatusSchema, "validateAsync").mockRejectedValue(error);

    await expect(checkStatusValidator(req, res, next)).rejects.toThrowError(error);
  });

  test(`Should success when parameter is false value`, async () => {
    (req.query.html as unknown) = false;
    jest.spyOn(checkStatusSchema, "validateAsync").mockResolvedValue({
      html: false,
    });
    await checkStatusValidator(req, res, next);

    expect(next).toBeCalled();
  });

  test(`Should success when parameter is true value`, async () => {
    (req.query.html as unknown) = true;
    jest.spyOn(checkStatusSchema, "validateAsync").mockResolvedValue({
      html: true,
    });
    await checkStatusValidator(req, res, next);

    expect(next).toBeCalled();
  });
});
