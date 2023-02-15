import app from "@/app";
import { statusService } from "@loaders/service.loader";
import { ERROR_MESSAGE } from "@utils/error";
import HTTP_STATUS_CODE from "@utils/http-status-code";
import { RESPONSE_MESSAGE, RESPONSE_STATUS } from "@utils/response";
import request from "supertest";

const path = "/api/status";

describe(`Get ${path} test :)`, () => {
  test("Bad parameter", async () => {
    const { body, status } = await request(app).get(path).query({
      html: "test",
    });

    expect(status).toEqual(HTTP_STATUS_CODE.INVALID_VALUE);
    expect(body.data).toEqual(ERROR_MESSAGE.INVALID_VALUE);
    expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
  });

  describe("If server status is bad :)", () => {
    test("No parameter", async () => {
      const { body, status } = await request(app).get(path);

      expect(status).toEqual(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual(RESPONSE_MESSAGE.BAD);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    test("Exist parameter if html false", async () => {
      const { status, body } = await request(app).get(path).query({
        html: false,
      });

      expect(status).toEqual(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual(RESPONSE_MESSAGE.BAD);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    test("Exist parameter if html true", async () => {
      const { status, text } = await request(app).get(path).query({
        html: true,
      });

      expect(status).toEqual(HTTP_STATUS_CODE.OK);
      expect(text).toEqual(RESPONSE_MESSAGE.BAD);
    });
  });

  describe("If server status is good :)", () => {
    beforeAll(() => {
      statusService.setServerStatus(true);
    });

    test("No parameter", async () => {
      const { body, status } = await request(app).get(path);

      expect(status).toEqual(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual(RESPONSE_MESSAGE.GOOD);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    test("Exist parameter if html false", async () => {
      const { status, body } = await request(app).get(path).query({
        html: false,
      });

      expect(status).toEqual(HTTP_STATUS_CODE.OK);
      expect(body.data).toEqual(RESPONSE_MESSAGE.GOOD);
      expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
    });

    test("Exist parameter if html true", async () => {
      const { status, text } = await request(app).get(path).query({
        html: true,
      });

      expect(status).toEqual(HTTP_STATUS_CODE.OK);
      expect(text).toEqual(RESPONSE_MESSAGE.GOOD);
    });
  });
});
