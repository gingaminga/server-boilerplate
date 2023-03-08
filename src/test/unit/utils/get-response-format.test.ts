import { RESPONSE_STATUS } from "@/utils/response";
import { getResponseFormat } from "@utils/index";

describe("Util function getResponseFormat test :)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test(`Should return failure value`, () => {
    const value = getResponseFormat(false, "");

    expect(value).toMatchObject({
      status: RESPONSE_STATUS.FAILURE,
    });
  });

  test(`Should return success value`, () => {
    const value = getResponseFormat(true, "");

    expect(value).toMatchObject({
      status: RESPONSE_STATUS.SUCCESS,
    });
  });
});
