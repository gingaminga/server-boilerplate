import app from "@/app";
import { startRelationDatabase, stopRelationDatabase } from "@/databases/index";
import { statusService } from "@/loaders/service.loader";
import { ERROR_MESSAGE } from "@/utils/error";
import HTTP_STATUS_CODE from "@/utils/http-status-code";
import { RESPONSE_MESSAGE, RESPONSE_STATUS } from "@/utils/response";
import request from "supertest";

const path = "/api/status";

describe(`Get ${path} API test :)`, () => {
  beforeAll(async () => {
    await startRelationDatabase();
  });

  afterAll(async () => {
    await stopRelationDatabase();
  });

  describe(`HTTP status ${HTTP_STATUS_CODE.INVALID_VALUE}`, () => {
    test("Should html parameter value is not boolean of string type", async () => {
      const { body, status } = await request(app).get(path).query({
        html: "test",
      });

      expect(status).toBe(HTTP_STATUS_CODE.INVALID_VALUE);
      expect(body.data).toEqual(ERROR_MESSAGE.INVALID_VALUE);
      expect(body.status).toEqual(RESPONSE_STATUS.FAILURE);
    });
  });

  describe(`HTTP status ${HTTP_STATUS_CODE.OK}`, () => {
    describe("Server status is bad", () => {
      beforeAll(async () => {
        await statusService.setServerStatus(false);
      });

      test("Should no parameter", async () => {
        const { body, status } = await request(app).get(path);

        expect(status).toBe(HTTP_STATUS_CODE.OK);
        expect(body.data).toEqual(RESPONSE_MESSAGE.BAD);
        expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      });

      test("Should html parameter value is false", async () => {
        const { status, body } = await request(app).get(path).query({
          html: false,
        });

        expect(status).toBe(HTTP_STATUS_CODE.OK);
        expect(body.data).toEqual(RESPONSE_MESSAGE.BAD);
        expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      });

      test("Should html parameter value is true", async () => {
        const { status, text } = await request(app).get(path).query({
          html: true,
        });

        expect(status).toBe(HTTP_STATUS_CODE.OK);
        expect(text).toEqual(RESPONSE_MESSAGE.BAD);
      });
    });

    describe("Server status is good", () => {
      beforeAll(async () => {
        await statusService.setServerStatus(true);
      });

      test("Should no parameter", async () => {
        const { body, status } = await request(app).get(path);

        expect(status).toBe(HTTP_STATUS_CODE.OK);
        expect(body.data).toEqual(RESPONSE_MESSAGE.GOOD);
        expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      });

      test("Should html parameter value is false", async () => {
        const { status, body } = await request(app).get(path).query({
          html: false,
        });

        expect(status).toBe(HTTP_STATUS_CODE.OK);
        expect(body.data).toEqual(RESPONSE_MESSAGE.GOOD);
        expect(body.status).toEqual(RESPONSE_STATUS.SUCCESS);
      });

      test("Should html parameter value is true", async () => {
        const { status, text } = await request(app).get(path).query({
          html: true,
        });

        expect(status).toBe(HTTP_STATUS_CODE.OK);
        expect(text).toEqual(RESPONSE_MESSAGE.GOOD);
      });
    });
  });
});
